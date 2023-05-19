import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ hasError, qtdContacts, qtdContactsFiltered }) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = hasError ? 'flex-end' : (
    (qtdContacts > 0 ? 'space-between' : 'center')
  );

  return (
    <Container justifyContent={alignment}>
      {(!hasError && qtdContacts > 0) && (
      <strong>
        {qtdContactsFiltered}
        {qtdContactsFiltered === 1 ? ' contato' : ' contatos'}
      </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtdContacts: PropTypes.number.isRequired,
  qtdContactsFiltered: PropTypes.number.isRequired,
};
