import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { formatPhone } from '../../utils/phone';
import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactsFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  const getContactById = useCallback(async () => {
    try {
      setIsLoading(true);
      const contact = await ContactsServices.listContactById(id);

      const contactWithPhoneFormatted = {
        ...contact,
        phone: formatPhone(contact.phone),
      };

      safeAsyncAction(() => {
        setContactName(contact.name);
        contactsFormRef.current.setFieldsValues(contactWithPhoneFormatted);
        setIsLoading(false);
      });
    } catch (error) {
      navigate('/');
      toast({ type: 'danger', text: error.message });
    } finally {
      safeAsyncAction(() => setIsLoading(false));
    }
  }, [id, navigate, safeAsyncAction]);

  useEffect(() => {
    getContactById();
  }, [getContactById]);

  async function handleSubmit(formData) {
    try {
      setContactName(formData.name);
      const response = await ContactsServices.updateContact(id, formData);
      toast({ type: 'success', text: response.message, duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: error.message });
    }
  }

  return {
    isLoading,
    contactName,
    contactsFormRef,
    handleSubmit,
  };
}
