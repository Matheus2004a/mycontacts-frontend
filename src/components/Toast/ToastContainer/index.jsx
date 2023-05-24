import { useEffect } from 'react';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

import { toastManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem, handleAnimationEndItem, renderList,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }

    toastManager.on('addtoast', handleAddToast);

    return () => {
      toastManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
          onAnimationEndMessage={handleAnimationEndItem}
          onRemoveMessage={() => handleRemoveItem(message.id)}
        />
      ))}
    </Container>
  );
}
