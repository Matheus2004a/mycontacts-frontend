import { useCallback, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovaItemsIds, setPendingRemovaItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovaItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEndItem = useCallback((id) => {
    setItems((prevState) => prevState.filter((message) => message.id !== id));
    setPendingRemovaItemsIds((prevState) => prevState.filter((messageId) => messageId !== id));
  }, []);

  return {
    items,
    setItems,
    pendingRemovaItemsIds,
    handleRemoveItem,
    handleAnimationEndItem,
  };
}
