import { useEffect, useState } from 'react';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

import { toastManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    toastManager.on('addtoast', handleAddToast);

    return () => {
      toastManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  function handleRemoveMessage(id) {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
          onRemoveMessage={() => handleRemoveMessage(message.id)}
        />
      ))}
    </Container>
  );
}
