import PageHeader from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

export default function EditContact() {
  return (
    <>
      <PageHeader title="Editar Matheus Aurélio" />
      <ContactForm buttonLabel="Salvar alterações" />
    </>
  );
}
