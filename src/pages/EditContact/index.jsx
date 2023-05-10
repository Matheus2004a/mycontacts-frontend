import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';

import { formatPhone, removeMaskPhone } from '../../utils/phone';
import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const contactsFormRef = useRef(null);
  const [contactName, setContactName] = useState('');

  const getContactById = useCallback(async () => {
    try {
      setIsLoading(true);
      const contact = await ContactsServices.listContactById(id);

      const contactWithPhoneFormatted = {
        ...contact,
        phone: formatPhone(contact.phone),
      };

      setContactName(contact.name);
      contactsFormRef.current.setFieldsValues(contactWithPhoneFormatted);
      setIsLoading(false);
    } catch (error) {
      navigate('/');
      toast({ type: 'danger', text: error.message });
    }
  }, [id, navigate]);

  useEffect(() => {
    getContactById();
  }, [getContactById]);

  async function handleSubmit(formData) {
    try {
      const contactEdited = {
        email: formData.email,
        name: formData.name,
        phone: removeMaskPhone(formData.phone),
      };

      setContactName(contactEdited.name);
      const response = await ContactsServices.updateContact(id, contactEdited);
      toast({ type: 'success', text: response.message, duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: error.message });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactsFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
