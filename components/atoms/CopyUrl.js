import { useRouter } from 'next/router';
import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { useToast } from 'context/ToastContext';
import { PRODUCTION_URL } from 'utils/constants';

const CopyUrl = () => {
  const router = useRouter();
  const showToast = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${PRODUCTION_URL}${router.asPath}`);
    showToast('Copied to clipboard', 'info');
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
