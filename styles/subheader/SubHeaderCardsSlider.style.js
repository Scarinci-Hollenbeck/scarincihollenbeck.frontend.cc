import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';

export const SubHeaderSlider = styled.div`
  padding-right: 80px;
  min-width: 600px;
  width: 45%;
  background-color: ${globalColor.blue.blue6002};

  ${media_breakpoint_exactly_down(1279)} {
    padding-right: 32px;
    width: 100%;
    min-width: unset;
  }

  ${media_breakpoint_down('md')} {
    padding-right: 12px;
  }
`;

export const SubHeaderSlide = styled.div`
  max-width: 730px;
  height: 100%;
  display: flex;
  gap: 12px;
  color: ${globalColor.white};

  ${media_breakpoint_exactly_down(1279)} {
    max-width: 100%;
  }
`;

export const SubHeaderSlideImage = styled.picture`
  flex-shrink: 0;
  width: 230px;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
  }

  ${media_breakpoint_exactly_down(1279)} {
    height: auto;
    min-height: 276px;
  }

  ${media_breakpoint_down('sm')} {
    width: 100px;
  }
`;

export const SubHeaderSlideContent = styled.div`
  padding: 10px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const SubHeaderSlideTitle = styled.h2`
  margin: 0;
  font-size: ${rem(20)};
  font-weight: 600;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(18)};
    line-height: 1.56;
  }
`;

export const SubHeaderSlideLabel = styled.span`
  color: ${globalColor.gray.gray150};
  font-size: ${rem(12)};
  line-height: 1.67;
  font-family: var(--font-lato);
  text-transform: uppercase;
`;

export const SubHeaderSlideDescription = styled.div`
  min-height: 120px;
  margin: 8px 0 26px;
  font-size: ${rem(14)};
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;

  * {
    margin: 0;
  }

  ${media_breakpoint_exactly_down('xxl')} {
    min-height: 105px;
  }

  ${media_breakpoint_exactly_down(1279)} {
    margin: 8px 0 16px;
    min-height: 60px;
    -webkit-line-clamp: 3;
  }

  ${media_breakpoint_down('md')} {
    -webkit-line-clamp: 4;
    min-height: 84px;
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(12)};
    line-height: 1.34;
    min-height: 64px;
  }
`;

export const SubHeaderSlideNavigationIcon = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${globalColor.blue.blue550};
  color: ${globalColor.blue.skyBlue};
  transition: ${globalTransition.default};
`;

export const SubHeaderSlideNavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  color: ${globalColor.gray.gray500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  transition: ${globalTransition.default};

  .nav-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: end;
    padding-right: 8px;
  }

  &.next {
    margin-top: auto;
  }

  &.prev {
    margin-bottom: auto;
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.gray.gray10};
      ${SubHeaderSlideNavigationIcon} {
        background-color: #373c59;
      }
    }
  }

  &:active {
    color: ${globalColor.gray.gray10};
    ${SubHeaderSlideNavigationIcon} {
      background-color: #373c59;
    }
  }
`;
