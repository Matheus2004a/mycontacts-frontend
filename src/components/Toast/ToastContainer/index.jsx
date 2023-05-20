import { useEffect } from 'react';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

import { toastManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    items: messages, setItems: setMessages, pendingRemovaItemsIds,
    handleAnimationEndItem, handleRemoveItem,
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
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={pendingRemovaItemsIds.includes(message.id)}
          onAnimationEndMessage={handleAnimationEndItem}
          onRemoveMessage={() => handleRemoveItem(message.id)}
        />
      ))}
    </Container>
  );
}
