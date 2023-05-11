import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const safeAction = useCallback((callback) => {
    if (isMounted()) callback();
  }, [isMounted]);

  return safeAction;
}
