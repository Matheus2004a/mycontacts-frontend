import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, Header, ListContainer, Card,
  InputSearchContainer, ErrorContainer, EmptyListContainer, SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import lupe from '../../assets/images/icons/magnifier-question.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';

import { Loader } from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';

import ContactsServices from '../../services/ContactsServices';

export default function Home() {
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

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        visible={isModalVisible}
        danger
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <h1>Tem certeza que deseja remover o contato ”{contactBeginDeleted?.name}”?</h1>

        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError ? 'flex-end' : (
            (contacts.length > 0 ? 'space-between' : 'center')
          )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <figcaption>
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={getContacts}>Tentar novamente</Button>
          </figcaption>
        </ErrorContainer>
      )}

      {!hasError && (
        <ListContainer orderBy={orderBy}>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty-box" />
              <figcaption>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </figcaption>
            </EmptyListContainer>
          )}
          <>
            {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFoundContainer>
                <img src={lupe} alt="lupe" />
                <figcaption>
                  Nenhum resultado foi encontrado para <strong>{search}.</strong>
                </figcaption>
              </SearchNotFoundContainer>
            )}

            {filteredContacts.length > 0 && (
              <header>
                <button
                  type="button"
                  className="sort-button"
                  onClick={handleToggleOrderBy}
                >
                  <span>Nome</span>
                  <img src={arrow} alt="arrow" />
                </button>
              </header>
            )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category_name && <small>{contact.category_name}</small>}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="icon-edit" />
                  </Link>

                  <button type="button" onClick={() => handleDeleteContact(contact)}>
                    <img src={trash} alt="icon-trash" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        </ListContainer>
      )}
    </Container>
  );
}
