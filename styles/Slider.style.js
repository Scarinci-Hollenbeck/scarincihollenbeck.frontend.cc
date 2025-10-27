import styled from 'styled-components';
import { globalColor, globalTransition } from './global_styles/Global.styles';

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .slider-container {
    max-width: 100%;
    width: 100%;

    &::part(container) {
      height: auto;
      padding-bottom: 64px;
      transition: padding 0.3s ease-out;
    }

    &::part(pagination) {
      top: calc(100% - 24px);
      bottom: unset;
    }

    &::part(bullet) {
      opacity: 1;
      background-color: rgba(146, 146, 146, 0.31);
    }

    &::part(bullet-active) {
      background-color: ${globalColor.blue.blue400};
    }
  }

  &:has(.swiper-button-lock) {
    .navigation-container {
      display: none;
    }

    .slider-container {
      &::part(container) {
        padding-bottom: 0;
      }
    }
  }

  .slide {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;
  }
`;

export const SliderNavigationWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  margin-left: auto;
  margin-top: -40px;
  z-index: 1;
`;

export const SliderNavigationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  transition: ${globalTransition.default};

  &:disabled {
    pointer-events: none;
    background-color: ${globalColor.gray.gray10};
  }
`;
