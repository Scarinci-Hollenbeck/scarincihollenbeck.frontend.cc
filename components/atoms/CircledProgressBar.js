import Image from 'next/image';
import React from 'react';
import {
  CircledProgressBarIcon,
  CircledProgressBarWrapper,
} from 'styles/CircledProgressBar.style';
import { globalColor } from 'styles/global_styles/Global.styles';
import PauseIcon from '../../public/icons/pause-icon.svg';
import PlayIcon from '../../public/icons/play-icon.svg';

const CircledProgressBar = ({
  radius = 18,
  timeLeft,
  interval,
  clickHandler,
  isTimerStopped,
  width = 40,
  height = 40,
  color = globalColor.blue.skyBlue,
  lineWidth = 1.5,
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / interval) * circumference;

  return (
    <CircledProgressBarWrapper
      onClick={clickHandler}
      $isPaused={isTimerStopped}
    >
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox={`0 0 ${width} ${height}`}
        className="circle"
      >
        <circle
          cx={`${width / 2}`}
          cy={`${height / 2}`}
          r={radius}
          stroke={color}
          strokeWidth={lineWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90, 20, 20)"
        />
      </svg>
      <span className="time">{timeLeft}</span>
      <CircledProgressBarIcon
        $isPaused={isTimerStopped}
        className="circle-timer-icon"
      >
        <Image
          src={isTimerStopped ? PlayIcon : PauseIcon}
          width={12}
          height={12}
          alt={`${isTimerStopped} ? "Play" : "Pause"`}
        />
      </CircledProgressBarIcon>
    </CircledProgressBarWrapper>
  );
};

export default CircledProgressBar;
