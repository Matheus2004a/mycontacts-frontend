import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

import { removeMaskPhone } from '../../utils/phone';

import ContactsServices from '../../services/ContactsServices';

export default function EditContact() {
  const { id } = useParams();

  const [contact, setContact] = useState({});

  const getContactById = useCallback(async () => {
    try {
      const response = await ContactsServices.listContactById(id);
      setContact(response);
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  useEffect(() => {
    getContactById();
  }, [getContactById]);

  async function handleSubmit(formData) {
    try {
      const contactEdited = {
        id,
        email: formData.email,
        name: formData.name,
        phone: removeMaskPhone(formData.telephone),
      };

      console.log(contactEdited);

      /*  const response = await ContactsServices.editContact(contact, contact.id);
      console.log(response); */
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <PageHeader title={`Editar ${contact?.name}`} />
      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
