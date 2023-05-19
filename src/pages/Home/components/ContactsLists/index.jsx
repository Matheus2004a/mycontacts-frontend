import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card } from './styles';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export default function ContactsLists({ filteredContacts, onDeleteContact, onToggleOrderBy }) {
  return (
    <>
      {filteredContacts.length > 0 && (
      <header>
        <button
          type="button"
          className="sort-button"
          onClick={onToggleOrderBy}
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
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="icon-edit" />
            </Link>

            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="icon-trash" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsLists.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
};
