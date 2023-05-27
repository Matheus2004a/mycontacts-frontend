import { useState, useEffect, useMemo, useCallback, useTransition } from 'react';

import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';
import ApiError from '../../errors/ApiError';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactBeginDeleted, setContactBeginDeleted] = useState(null);

  const [search, setSearch] = useState('');
  const [deferredSearch, setDeferredSearch] = useState('');

  const [isPending, startTransition] = useTransition('');

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      (error instanceof ApiError) ? setHasError(false) : setHasError(true);
      setContacts([]);
    }
    setIsLoading(false);
  }, [orderBy]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const filteredContacts = useMemo(() => {
    const contactLowerCase = (contact) => (
      contact.name.toLowerCase().includes(deferredSearch.toLowerCase())
    );
    return contacts.filter(contactLowerCase);
  }, [contacts, deferredSearch]);

  function handleSearchContact(e) {
    const { value } = e.target;

    setSearch(value);

    startTransition(() => {
      setDeferredSearch(value);
    });
  }

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleDeleteContact = useCallback((contact) => {
    setContactBeginDeleted(contact);
    setIsModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsModalVisible(false);
    setContactBeginDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      const contactDeleted = await ContactsServices.deleteContact(contactBeginDeleted.id);

      setContacts((prevState) => prevState.filter((contact) => (
        contact.id !== contactBeginDeleted.id
      )));

      toast({ type: 'success', text: contactDeleted.message });
    } catch (error) {
      toast({ type: 'danger', text: error.message });
    } finally {
      setIsLoadingDelete(false);
      handleCloseDeleteModal();
    }
  }

  return {
    isPending,
    contacts,
    contactBeginDeleted,
    getContacts,
    search,
    isLoading,
    isLoadingDelete,
    hasError,
    orderBy,
    isModalVisible,
    filteredContacts,
    handleToggleOrderBy,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleSearchContact,
  };
}
