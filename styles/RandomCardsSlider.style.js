import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { ContactBox, InfoBox, LinkBox } from './AttorneyCard.style';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import Image from 'next/image';
import { Title32 } from './common/Typography.style';
import { attorneyCardForPractices } from './subheader/SubHeader.style';
import Link from 'next/link';

export const RandomSliderWrapper = styled.section`
  padding: 60px 0 160px;
  position: relative;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 175px;
    z-index: -1;
    background: linear-gradient(
      180deg,
      rgba(6, 11, 42, 0) 0%,
      rgba(6, 11, 42, 0.85) 53.37%,
      #060b2a 93.36%
    );
  }

  ${media_breakpoint_down('xl')} {
    padding: 60px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const RandomSliderBg = styled(Image)`
  z-index: -1;
`;

export const RandomSliderHolder = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 80px;
  border-radius: ${globalBorderRadius.big};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.08);
  display: flex;
  flex-direction: column;

  ${media_breakpoint_down('xxl')} {
    max-width: 1112px;
  }

  ${media_breakpoint_down('lg')} {
    padding: 20px 32px;
  }

  ${media_breakpoint_down('md')} {
    padding: 12px;
  }
`;

export const RandomSliderTitle = styled(Title32)`
  margin-bottom: 12px !important;

  ${media_breakpoint_down('md')} {
    margin-bottom: 8px !important;
  }
`;

export const RandomSliderSubtitle = styled.p`
  margin: 0 0 16px 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(24)};
  line-height: 1.5;
  font-weight: 400;
  font-family: var(--font-lato);
  text-transform: uppercase;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const RandomSliderCard = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 16px;
  row-gap: 12px;

  ${attorneyCardForPractices};

  .attorney-card-box {
    max-width: 440px;
    width: 100%;
    flex: unset;

    &:hover {
      > div {
        h3 {
          color: ${globalColor.blue.blue400};
        }
      }
    }

    ${LinkBox} {
      img {
        border-radius: 4px;
      }
    }

    ${InfoBox} {
      h3 {
        color: ${globalColor.blue.darkBlue};
        font-size: ${rem(18)};
        line-height: 1.56;

        ${media_breakpoint_down('sm')} {
          font-size: ${rem(14)};
        }
      }

      p {
        font-family: var(--font-lato);
        color: ${globalColor.gray.gray110};
        font-size: ${rem(12)};
        line-height: 1.67;
        font-weight: 400;
        text-transform: uppercase;
      }
    }

    ${ContactBox} {
      .contact-offices,
      a {
        span {
          color: ${globalColor.blue.darkBlue};
          font-weight: 400;
        }

        svg {
          fill: ${globalColor.blue.blue400};
          width: 20px;
          height: 20px;

          ${media_breakpoint_down('sm')} {
            width: 16px;
            height: 16px;
          }
        }
      }

      .contact-offices {
        &:hover {
          svg {
            fill: ${globalColor.blue.blue400};
          }
        }
      }

      a {
        &:hover {
          svg {
            fill: ${globalColor.blue.blue400};
          }
        }
      }

      .contact-offices__links {
        > a {
          &::after {
            background-color: ${globalColor.blue.darkBlue};
          }
        }
      }
    }
  }

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
  }
`;

export const RandomSliderCardImage = styled.picture`
  height: 206px;
  max-width: 440px;
  width: 100%;
  display: flex;

  img {
    margin: 0 auto;
    width: fit-content;
    height: 100%;
    object-fit: cover;
    border-radius: ${globalBorderRadius.small};
    overflow: hidden;

    ${media_breakpoint_down('xl')} {
      object-fit: contain;
    }
  }

  ${media_breakpoint_down('xl')} {
    max-width: 100%;
    height: 300px;
  }

  ${media_breakpoint_down('sm')} {
    height: 150px;
  }
`;

export const RandomSliderCardDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media_breakpoint_down('xl')} {
    min-height: 120px;
  }

  ${media_breakpoint_down('sm')} {
    min-height: 100px;
    font-size: ${rem(14)};
  }
`;

export const RandomSliderCardTitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(18)};
  font-weight: 500;
`;

export const RandomSliderCardDescriptionText = styled.p`
  margin: 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(16)};
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    margin: 0;
  }

  ${media_breakpoint_down('xl')} {
    -webkit-line-clamp: 4;
  }
`;

export const RandomSliderCardLink = styled(Link)`
  margin: auto 0 0 auto;
  display: flex;
  text-transform: capitalize;
`;

export const RandomSliderFooter = styled.div`
  margin-top: 24px;

  ${media_breakpoint_down('sm')} {
    margin-top: 12px;
  }
`;

export const RandomSliderControlPanel = styled.div`
  max-width: 568px;
  padding: 4px 16px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 12px;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.blue.blue500};
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  color: ${globalColor.white};

  ${media_breakpoint_down('lg')} {
    max-width: 100%;
  }

  ${media_breakpoint_down('sm')} {
    padding: 4px 8px;
  }
`;

export const RandomSliderControlProgress = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  > .label {
    font-family: var(--font-lato);
    font-size: ${rem(12)};
    line-height: 1.67;
    text-transform: uppercase;
  }
`;

export const RandomSliderControlButton = styled.button`
  height: 100%;
  padding: 4px 4px 2px 4px;
  display: flex;
  align-items: center;
  column-gap: 4px;
  color: ${globalColor.white};
  font-size: inherit;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      border-color: ${globalColor.blue.skyBlue};

      > .icon {
        color: ${globalColor.blue.skyBlue};
      }
    }
  }

  &:active {
    border-color: ${globalColor.blue.skyBlue};
    color: ${globalColor.blue.skyBlue};

    > .icon {
      color: ${globalColor.blue.skyBlue};
    }
  }

  &:first-of-type {
    margin-left: auto;
  }

  &:disabled {
    color: ${globalColor.grayLite.grayLite100};
    pointer-events: none;
    background-color: transparent;
  }

  > .icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${globalTransition.default};

    ${media_breakpoint_down('sm')} {
      width: 20px;
      height: 20px;
    }
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;
