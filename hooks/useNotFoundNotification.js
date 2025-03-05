import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import empty from 'is-empty';

export default function useNotFoundNotification(message) {
  const router = useRouter();
  const notifyTime = 5000;
  const searchParams = new URLSearchParams(router.query);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const notFound = searchParams.get('notFound');
    if (notFound) {
      import('react-toastify').then(({ toast }) => {
        toast.error(message, {
          position: 'bottom-right',
          autoClose: notifyTime,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          className: 'error-notify',
        });
      });

      searchParams.delete('notFound');

      timeoutRef.current = setTimeout(() => {
        const updatedQueryString = searchParams.toString();
        if (!empty(updatedQueryString)) {
          router.replace(
            `${router.pathname}?${updatedQueryString}`,
            undefined,
            {
              shallow: true,
            },
          );
        } else {
          router.replace(`${router.pathname}`, undefined, {
            shallow: true,
          });
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
