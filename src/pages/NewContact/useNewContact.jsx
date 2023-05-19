import { useRef } from 'react';

import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      const response = await ContactsServices.createContact(contact);
      contactFormRef.current.resetFields();
      toast({ type: 'success', text: response.message, duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: error.message });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
