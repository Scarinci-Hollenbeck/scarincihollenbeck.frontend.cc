import { useEffect, useState } from 'react';

const useAnchorLink = () => {
  const [hrefToId, setHref] = useState('');

  useEffect(() => {
    const clearId = setTimeout(() => {
      setHref('');
    }, 100);
    return () => clearTimeout(clearId);
  }, [hrefToId]);

  return {
    setHref,
    hrefToId,
  };
};

export default useAnchorLink;
