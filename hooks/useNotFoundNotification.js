import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import empty from 'is-empty';
import { useToast } from 'context/ToastContext';

export default function useNotFoundNotification(message) {
  const router = useRouter();
  const showToast = useToast();
  const notifyTime = 5000;
  const searchParams = new URLSearchParams(router.query);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const notFound = searchParams.get('notFound');
    if (notFound) {
      showToast(message, 'error', notifyTime);

      searchParams.delete('notFound');

      timeoutRef.current = setTimeout(() => {
        const updatedQueryString = searchParams.toString();
        if (!empty(updatedQueryString)) {
          router.replace(
            `${router.pathname}?${updatedQueryString}`,
            undefined,
            { shallow: true },
          );
        } else {
          router.replace(`${router.pathname}`, undefined, { shallow: true });
        }
      }, notifyTime);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [router, message]);
}
