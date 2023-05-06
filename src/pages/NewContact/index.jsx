import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

import { removeMaskPhone } from '../../utils/phone';

import ContactsServices from '../../services/ContactsServices';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        category_id: formData.category,
        email: formData.email,
        name: formData.name,
        phone: removeMaskPhone(formData.telephone),
      };

      const response = await ContactsServices.createContact(contact);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
