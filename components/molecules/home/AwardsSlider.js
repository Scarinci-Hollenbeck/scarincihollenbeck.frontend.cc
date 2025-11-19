import React from 'react';
import SwiperWrapper from 'components/organisms/common/SwiperWrapper';
import empty from 'is-empty';
import DisclaimerText from 'components/atoms/DisclaimerText';
import { AwardsSliderWrapper } from 'styles/Awards.style';
import SwiperSlide from 'components/organisms/common/SwiperSlide';
import AwardCard from './AwardCard';

const breakpointsDefault = {
  1440: {
    slidesPerView: 5,
    spaceBetween: 32,
  },
  1280: {
    slidesPerView: 4,
  },
  768: {
    spaceBetween: 20,
    slidesPerView: 3,
  },
  0: {
    spaceBetween: 12,
    slidesPerView: 2,
  },
};

const AwardsSlider = ({
  items,
  breakpoints = breakpointsDefault,
  isLightVariant = false,
}) => {
  if (empty(items)) return null;

  return (
    <AwardsSliderWrapper $isLightVariant={isLightVariant}>
      <SwiperWrapper
        breakpoints={breakpoints}
        space-between={32}
        lazy="true"
        grab-cursor="true"
      >
        {items?.map((item) => (
          <SwiperSlide key={`${item?.id}-${item?.year}`}>
            <AwardCard
              image={item?.image}
              year={item?.year}
              label={item?.label}
              link={item?.link}
              isLightVariant={isLightVariant}
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
      <DisclaimerText text="No aspect of the advertisement has been approved by the Supreme Court." />
    </AwardsSliderWrapper>
  );
};

export default AwardsSlider;
