import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import {
  HeaderSearchWrapper,
  SearchAnimatedWrapper,
  SearchOpener,
} from 'styles/Header.style';
import dynamic from 'next/dynamic';

const GlobalSearch = dynamic(
  () => import('../GlobalSearch/GlobalSearch').then((mod) => ({
    default: mod.GlobalSearch,
  })),
  { ssr: false },
);

const HeaderSearch = ({ isOpenSearch, setIsOpenSearch }) => {
  const [inputFocus, setInputFocus] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null);
  const closingTimerRef = useRef(null);

  const handleOpenSearch = (e) => {
    e.preventDefault();
    setIsOpenSearch(true);
    setInputFocus(true);
  };

  const handleHideSearch = useCallback(() => {
    if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    setIsClosing(true);
    closingTimerRef.current = setTimeout(() => {
      setIsOpenSearch(false);
      setIsClosing(false);
      closingTimerRef.current = null;
    }, 280);
  }, [setIsOpenSearch]);

  const handleDocumentClick = useCallback(
    (e) => {
      const selection = window.getSelection();
      const isTextSelected = selection && selection.toString().length > 0;

      if (
        containerRef.current
        && !containerRef.current.contains(e.target)
        && !isTextSelected
      ) {
        handleHideSearch();
      }
    },
    [handleHideSearch],
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    };
  }, [handleDocumentClick]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <HeaderSearchWrapper
      $open={isOpenSearch}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {isOpenSearch && (
        <SearchAnimatedWrapper $closing={isClosing}>
          <GlobalSearch
            setIsOpenSearch={setIsOpenSearch}
            handleHideSearch={handleHideSearch}
            inputFocus={inputFocus}
          />
        </SearchAnimatedWrapper>
      )}

      {!isOpenSearch && (
        <SearchOpener onClick={handleOpenSearch} aria-label="Search opener">
          <IoSearchOutline />
        </SearchOpener>
      )}
    </HeaderSearchWrapper>
  );
};

export default HeaderSearch;
