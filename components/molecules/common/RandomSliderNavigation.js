import CircledProgressBar from 'components/atoms/CircledProgressBar';
import React from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight } from 'react-icons/fa6';
import {
  RandomSliderControlButton,
  RandomSliderControlPanel,
  RandomSliderControlProgress,
} from 'styles/RandomCardsSlider.style';

const RandomSliderNavigation = ({
  handleNextClick,
  handlePrevClick,
  handleCircleClick,
  isPrevDisabled,
  isTimerStopped,
  timeLeft,
  interval,
  navigationLabel = 'next',
}) => (
  <RandomSliderControlPanel>
    <RandomSliderControlProgress>
      <CircledProgressBar
        isTimerStopped={isTimerStopped}
        timeLeft={timeLeft}
        interval={interval}
        clickHandler={handleCircleClick}
      />

      <span className="label">{navigationLabel}</span>
    </RandomSliderControlProgress>

    <RandomSliderControlButton
      disabled={isPrevDisabled}
      onClick={handlePrevClick}
    >
      <span className="icon">
        <FaArrowRotateLeft />
      </span>
      PREV
    </RandomSliderControlButton>
    <RandomSliderControlButton onClick={handleNextClick}>
      NEXT
      <span className="icon">
        <FaArrowRotateRight />
      </span>
    </RandomSliderControlButton>
  </RandomSliderControlPanel>
);

export default RandomSliderNavigation;
