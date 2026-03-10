import SliderNavigation from 'components/common/SliderNavigation';
import React, { useEffect, useRef } from 'react';
import { SliderWrapper } from 'styles/Slider.style';
import empty from 'is-empty';
import { register } from 'swiper/element';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Minimal structural CSS injected into the Swiper shadow DOM.
// Visual styles (bullet color, opacity, pagination position) are applied
// from outside via CSS ::part() selectors in Slider.style.js.
const PAGINATION_STYLES = `
  .swiper-pagination {
    position: absolute;
    text-align: center;
    transition: .3s opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;
  }
  .swiper-pagination-hidden { opacity: 0; }
  .swiper-pagination-lock { display: none; }
  .swiper-pagination-disabled > .swiper-pagination,
  .swiper-pagination.swiper-pagination-disabled { display: none !important; }
  .swiper-pagination-horizontal {
    bottom: 8px;
    top: auto;
    left: 0;
    width: 100%;
  }
  .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .swiper-pagination-bullets-dynamic { overflow: hidden; font-size: 0; }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet { transform: scale(.33); position: relative; }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev { transform: scale(.66); }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev { transform: scale(.33); }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next { transform: scale(.66); }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next { transform: scale(.33); }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main { transform: scale(1); }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #000;
    opacity: .2;
    margin: 0 4px;
  }
  .swiper-pagination-bullet:only-child { display: none !important; }
  button.swiper-pagination-bullet {
    border: none;
    padding: 0;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .swiper-pagination-clickable .swiper-pagination-bullet { cursor: pointer; }
  .swiper-pagination-bullet-active { opacity: 1; }
`;

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

  useEffect(() => {
    register();
    const swiperEl = swiperRef.current;
    if (!swiperEl) return;

    Object.assign(swiperEl, {
      modules: [Navigation, Pagination, Autoplay],
      pagination:
        pagination === 'true'
          ? {
            enabled: true,
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }
          : { enabled: false },
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
      injectStyles: pagination === 'true' ? [PAGINATION_STYLES] : [],
      ...(!empty(breakpoints) && { breakpoints }),
    });

    swiperEl.initialize();
  }, []);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      const { swiper } = swiperRef.current;
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
        init="false"
        {...props}
      >
        {children}
      </swiper-container>

      {navigation && <SliderNavigation prevRef={prevRef} nextRef={nextRef} />}
    </SliderWrapper>
  );
};

export default SwiperWrapper;
