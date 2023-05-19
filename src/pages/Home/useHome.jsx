import { useState, useEffect, useMemo, useCallback } from 'react';

import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactBeginDeleted, setContactBeginDeleted] = useState(null);

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  }, [orderBy]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const filteredContacts = useMemo(() => {
    const contactLowerCase = (contact) => contact.name.toLowerCase().includes(search.toLowerCase());
    return contacts.filter(contactLowerCase);
  }, [contacts, search]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleDeleteContact(contact) {
    setContactBeginDeleted(contact);
    setIsModalVisible(true);
  }

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
    contacts,
    contactBeginDeleted,
    getContacts,
    search,
    setSearch,
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
  };
}
