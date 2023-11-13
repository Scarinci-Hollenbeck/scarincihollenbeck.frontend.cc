import React, { createContext, useState } from 'react';
import useAnchorLink from '../hooks/useAnchorLink';

export const EntertainmentInfoContext = createContext(null);
export const EntertainmentInfoProvider = ({ children }) => {
  const { setHref, hrefToId } = useAnchorLink();
  const [currentSlideTitle, setCurrentSlideTitle] = useState();
  const anchorToEntertainmentInfoBlock = 'EntertainmentInfo';
  const clickByAnchorToEntertainmentInfoAndOpenPractice = (titleSlide) => {
    setHref(anchorToEntertainmentInfoBlock);
    setCurrentSlideTitle(titleSlide);
  };

  const values = {
    clickByAnchorToEntertainmentInfoAndOpenPractice,
    anchorToEntertainmentInfoBlock,
    currentSlideTitle,
    hrefToId,
  };
  return (
    <EntertainmentInfoContext.Provider value={values}>
      {children}
    </EntertainmentInfoContext.Provider>
  );
};
