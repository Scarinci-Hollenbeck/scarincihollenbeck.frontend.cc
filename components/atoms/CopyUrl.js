import { useRouter } from 'next/router';
import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { PRODUCTION_URL } from 'utils/constants';

const CopyUrl = () => {
  const router = useRouter();
  const url = `${PRODUCTION_URL}${router.asPath}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    import('react-toastify').then(({ toast }) => {
      toast.info('Copied to clipboard', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'copy-notify',
      });
    });
  };
  return (
    <button
      aria-label="copy link"
      onClick={handleCopyLink}
      className="copy-button"
    >
      <IoCopy />
    </button>
  );
};

export default CopyUrl;
