import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';

import { removeMaskPhone } from '../../utils/phone';
import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getContactById = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ContactsServices.listContactById(id);
      setContact(response);
      setIsLoading(false);
    } catch (error) {
      navigate('/');
      toast({ type: 'danger', text: error.message });
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
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contact?.name}`} />

      <ContactForm
        key={contact.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        contact={contact}
      />
    </>
  );
}
