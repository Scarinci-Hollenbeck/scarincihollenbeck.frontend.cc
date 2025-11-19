import SliderNavigation from 'components/common/SliderNavigation';
import React, { useEffect, useRef } from 'react';
import { SliderWrapper } from 'styles/Slider.style';
import empty from 'is-empty';
import { register } from 'swiper/element/bundle';

const SwiperWrapper = ({
  breakpoints,
  children,
  pagination = 'true',
  navigation = 'true',
  ...props
}) => {
  const swiperRef = useRef();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationConfig = pagination === 'true'
    ? {
      pagination: 'true',
      'pagination-clickable': 'true',
      'pagination-dynamic-bullets': 'true',
      'pagination-dynamic-main-bullets': '3',
    }
    : {
      pagination: 'false',
    };

  useEffect(() => {
    register();
    const swiper = swiperRef.current?.swiper;

    if (!empty(breakpoints)) {
      const slider = {
        breakpoints,
      };

      Object.assign(swiperRef.current, slider);
    }

    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [breakpoints]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.update();
      if (swiper.params.navigation && swiper.navigation) {
        swiper.navigation.update();
      }
      if (swiper.params.pagination && swiper.pagination) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    }
  }, [children]);

  return (
    <SliderWrapper>
      <swiper-container
        ref={swiperRef}
        class="slider-container"
        {...paginationConfig}
        {...props}
      >
        {children}
      </swiper-container>

      {navigation && <SliderNavigation prevRef={prevRef} nextRef={nextRef} />}
    </SliderWrapper>
  );
};
export default SwiperWrapper;
