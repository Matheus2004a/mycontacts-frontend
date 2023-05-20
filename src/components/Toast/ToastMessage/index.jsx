import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
  message, isLeaving, onAnimationEndMessage, onRemoveMessage,
}) {
  const animationRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEndMessage(message.id);
    }

    const elementRef = animationRef.current;

    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, message, onAnimationEndMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage();
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  return (
    <Container
      type={message.type}
      onClick={onRemoveMessage}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animationRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="x-circle" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="check-circle" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onAnimationEndMessage: PropTypes.func.isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
