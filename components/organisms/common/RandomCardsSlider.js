import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  RandomSliderBg,
  RandomSliderFooter,
  RandomSliderHolder,
  RandomSliderSubtitle,
  RandomSliderTitle,
  RandomSliderWrapper,
} from 'styles/RandomCardsSlider.style';
import empty from 'is-empty';
import RandomSliderNavigation from 'components/molecules/common/RandomSliderNavigation';

const usedIndices = new Set();
const indexSequence = [];
let currentIndex = -1;

const getRandomIndex = (min, max) => {
  if (usedIndices.size >= max - min) {
    usedIndices.clear();
    indexSequence.length = 0;
    currentIndex = -1;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * (max - min) + min);
  } while (usedIndices.has(randomIndex));

  usedIndices.add(randomIndex);
  indexSequence.push(randomIndex);
  currentIndex = indexSequence.length - 1;
  return randomIndex;
};

const RandomCardsSlider = ({
  list,
  navigationLabel,
  title,
  subtitle,
  CardComponent,
}) => {
  if (!CardComponent) return null;
  const interval = 15;
  const [randomIndex, setRandomIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(interval);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const displayedCard = list?.[randomIndex];

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!empty(list) && !initialized) {
      setRandomIndex(getRandomIndex(0, list.length));
      setInitialized(true);
    }

    if (!isVisible) {
      setIsTimerStopped(true);
    } else {
      setIsTimerStopped(false);
    }
  }, [list, initialized, isVisible]);

  const nextSlide = useCallback(() => {
    if (currentIndex === indexSequence.length - 1) {
      setRandomIndex(getRandomIndex(0, list?.length));
    } else {
      currentIndex += 1;
      setRandomIndex(indexSequence[currentIndex]);
    }
    setIsPrevDisabled(currentIndex <= 0);
  }, [list?.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          nextSlide();
          return interval;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  }, [interval, nextSlide]);

  const restartTimer = useCallback(() => {
    setTimeLeft(interval);
    startTimer();
  }, [interval, startTimer]);

  useEffect(() => {
    if (!empty(list) && !isTimerStopped) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerStopped, list?.length]);

  const handleCircleClick = useCallback(() => {
    setIsTimerStopped((prev) => !prev);
  }, []);

  const handleNextClick = useCallback(() => {
    nextSlide();

    if (!empty(list) && !isTimerStopped) {
      restartTimer();
    }
  }, [isTimerStopped, nextSlide, restartTimer, list]);

  const handlePrevClick = useCallback(() => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      setRandomIndex(indexSequence[currentIndex]);
    }
    setIsPrevDisabled(currentIndex <= 0);

    if (!empty(list) && !isTimerStopped) {
      restartTimer();
    }
  }, [isTimerStopped, restartTimer, list]);

  return (
    <RandomSliderWrapper ref={containerRef} data-testid="bio-autoplay">
      <RandomSliderBg
        src="/images/random-bio-bg.webp"
        fill
        alt="Background for we can help section"
        loading="lazy"
        quality={70}
      />
      <ContainerDefault>
        <RandomSliderHolder>
          {!empty(title) && <RandomSliderTitle>{title}</RandomSliderTitle>}

          {!empty(subtitle) && (
            <RandomSliderSubtitle>{subtitle}</RandomSliderSubtitle>
          )}

          {/* At the moment created: RandomBioCard, RandomPostCard variants */}
          {CardComponent && (
            <CardComponent
              displayedCard={displayedCard}
              randomIndex={randomIndex}
            />
          )}

          <RandomSliderFooter>
            <RandomSliderNavigation
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              handleCircleClick={handleCircleClick}
              isPrevDisabled={isPrevDisabled}
              isTimerStopped={isTimerStopped}
              timeLeft={timeLeft}
              interval={interval}
              navigationLabel={navigationLabel}
            />
          </RandomSliderFooter>
        </RandomSliderHolder>
      </ContainerDefault>
    </RandomSliderWrapper>
  );
};

export default RandomCardsSlider;
