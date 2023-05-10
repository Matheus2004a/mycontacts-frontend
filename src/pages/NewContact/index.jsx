import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

import { removeMaskPhone } from '../../utils/phone';
import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        category_id: formData.category,
        email: formData.email,
        name: formData.name,
        phone: removeMaskPhone(formData.phone),
      };

      const response = await ContactsServices.createContact(contact);
      contactFormRef.current.resetFields();
      toast({ type: 'success', text: response.message, duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: error.message });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
