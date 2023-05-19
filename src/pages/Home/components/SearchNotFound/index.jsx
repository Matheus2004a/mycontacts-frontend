import PropTypes from 'prop-types';
import { Container } from './styles';

import lupe from '../../../../assets/images/icons/magnifier-question.svg';

export default function SearchNotFound({ search }) {
  return (
    <Container>
      <img src={lupe} alt="lupe" />
      <figcaption>
        Nenhum resultado foi encontrado para <strong>{search}.</strong>
      </figcaption>
    </Container>
  );
}

SearchNotFound.propTypes = {
  search: PropTypes.string.isRequired,
};
