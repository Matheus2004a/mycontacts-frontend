import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, Header, ListContainer, Card,
  InputSearchContainer, ErrorContainer, EmptyListContainer, SearchNotFoundContainer,
  /* ErrorFilterContacts */
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import lupe from '../../assets/images/icons/magnifier-question.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';

import { Loader } from '../../components/Loader';
import Button from '../../components/Button';

import ContactsServices from '../../services/ContactsServices';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  return (
    <Container>
      <Loader isLoading={isLoading} />

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

                  <button type="button">
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
