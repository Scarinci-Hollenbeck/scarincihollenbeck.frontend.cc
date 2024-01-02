import AttorneysListBox from 'components/common/AttorneysListBox';
import useStateScreen from 'hooks/useStateScreen';
import empty from 'is-empty';
import React, {
  createRef, useEffect, useMemo, useRef, useState,
} from 'react';
import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import { PracticeAttorneysSection } from 'styles/practices/PracticeAttorneys';
import { PracticeTitle } from 'styles/practices/PracticeCommon.style';

const PracticeAttorneys = ({ attorneys, chairs, anchorId }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardGap, setCardGap] = useState(0);
  const containerRef = useRef();
  const { isMobileScreen } = useStateScreen(0);
  const totalItems = attorneys.length + chairs.length;

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      if (containerRef.current) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setContainerWidth(containerRef.current.clientWidth);
        }, 300);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const calculateItemsPerRow = useMemo(() => {
    const availableWidth = containerWidth + cardGap;
    return Math.floor(availableWidth / (cardWidth + cardGap));
  }, [containerWidth, cardWidth, cardGap]);

  const handleCardParams = (width, height) => {
    setCardWidth(width);
    setCardHeight(height);
  };

  const handleCardGap = (gap) => {
    setCardGap(gap);
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <PracticeAttorneysSection
      className={`margin-scroll ${isCollapsed ? 'collapsed' : ''}`}
      minHeight={chairs.length > 0 ? cardHeight + 27 : cardHeight}
      id={anchorId}
    >
      <ContainerContent className="practice-container">
        <div className="attorneys-practice__header">
          <PracticeTitle>Practice Area Attorneys</PracticeTitle>
          {totalItems > calculateItemsPerRow
            && (!isCollapsed ? (
              <button onClick={handleCollapse}>
                See all
                {` ${totalItems}`}
              </button>
            ) : (
              <button onClick={handleCollapse}>HIDE</button>
            ))}
        </div>
        <div className="attorneys-practice__wrapper" ref={containerRef}>
          {(!empty(chairs) || !empty(attorneys)) && (
            <AttorneysListBox
              attorneys={{
                chairs,
                attorneysList: attorneys,
              }}
              handleCardParams={handleCardParams}
              handleCardGap={handleCardGap}
            />
          )}
        </div>
      </ContainerContent>
    </PracticeAttorneysSection>
  );
};

export default PracticeAttorneys;
