import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedRef = useRef(null);

  function removeModal() {
    setShouldRender(false);
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    const animatedRefElement = animatedRef.current;

    if (!visible && animatedRefElement) {
      animatedRefElement.addEventListener('animationend', removeModal);
    }

    return () => {
      if (animatedRefElement) {
        animatedRefElement.removeEventListener('animationend', removeModal);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedRef,
  };
}
