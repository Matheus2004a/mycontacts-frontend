import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type, onRemoveMessage }) {
  return (
    <Container
      type={type}
      onClick={onRemoveMessage}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcon} alt="x-circle" />}
      {type === 'success' && <img src={checkCircleIcon} alt="check-circle" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  onRemoveMessage: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  type: 'default',
};
