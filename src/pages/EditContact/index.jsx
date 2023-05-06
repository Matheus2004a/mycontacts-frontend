import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

export default function EditContact() {
  function handleSubmit() {
    console.log('Submit form edit contact');
  }

  return (
    <>
      <PageHeader title="Editar Matheus Aurélio" />
      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
