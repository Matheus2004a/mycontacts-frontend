import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, Header, ListContainer, Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');

  async function getContacts() {
    try {
      const response = await fetch(`https://mycontacts-backend.vercel.app/contacts?orderBy=${orderBy}`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>

        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer orderBy={orderBy}>
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

        {!contacts.length && <p>{contacts.message}</p>}

        {contacts.length > 0 && contacts.map((contact) => (
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
      </ListContainer>
    </Container>
  );
}
