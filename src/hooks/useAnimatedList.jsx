import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovaItemsIds, setPendingRemovaItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEndItem = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) => prevState.filter((message) => message.id !== itemId));
    setPendingRemovaItemsIds((prevState) => prevState.filter((messageId) => messageId !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovaItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedRef?.current && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEndItem(itemId);

        const removeListener = () => {
          animatedRef.current.removeListener('animationend', onAnimationEnd);
        };

        animatedRef.current.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovaItemsIds, handleAnimationEndItem]);

  useEffect(() => {
    const removedListeners = animationEndListeners.current;

    return () => {
      removedListeners.forEach((listener) => listener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovaItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => {
    items.map((item) => {
      const isLeaving = pendingRemovaItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(renderItem, { isLeaving, animatedRef });
    });
  }, [items, pendingRemovaItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEndItem,
    renderList,
  };
}
