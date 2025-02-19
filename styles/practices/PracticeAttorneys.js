import Image from 'next/image';
import styled from 'styled-components';
import { ContactBox } from 'styles/AttorneyCard.style';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const PracticeAttorneysSection = styled.section`
  padding: 24px 0;
  position: relative;

  &.collapsed {
    .attorneys-practice__wrapper {
      grid-template-rows: 1fr;
    }
  }

  .attorneys-practice__header {
    margin-bottom: 12px;
    display: flex;
    align-items: flex-end;
    column-gap: 16px;

    > button {
      margin-bottom: 5px;
      height: 100%;
      display: flex;
      color: ${globalColor.blue.blue600};
      font-family: var(--font-poppins);
      font-size: ${rem(16)};
      font-weight: 700;
      text-decoration: underline;
      transition: all 0.2s ease-out;
      text-transform: uppercase;

      &:hover {
        color: ${globalColor.red.darkRed};
      }

      &:active {
        color: ${globalColor.blue.blue500};
      }

      ${media_breakpoint_down('md')} {
        margin-bottom: 0;
      }

      ${media_breakpoint_down('sm')} {
        align-self: center;
        font-size: ${rem(14)};
        line-height: 20px;
      }
    }

    ${media_breakpoint_down('lg')} {
      margin-bottom: 20px;
    }
  }

  .attorneys-practice__wrapper {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: all 0.5s linear;
  }

  ${media_breakpoint_down('md')} {
    margin: 0 0 32px 0;
  }
`;

export const PracticeAttorneysBg = styled(Image)`
  z-index: -1;
  opacity: 0.1;
  object-fit: cover;
`;

export const PracticeAttorneysCard = styled.div`
  width: 100%;
  height: 218px;
  padding: 4px;
  position: relative;
  cursor: pointer;

  ${media_breakpoint_down('md')} {
    height: 202px;

    a {
      display: flex;
      white-space: normal;
    }
  }

  @media (hover: hover) {
    &:hover {
      .attorney__image {
        filter: grayscale(0%);
      }

      .attorney__content {
        &::after {
          opacity: 1;
        }

        .attorney__designation {
          margin-bottom: 8px;
        }
      }

      .attorney__contact {
        grid-template-rows: 1fr;
        opacity: 1;
      }
    }
  }

  &.active {
    .attorney__image {
      filter: grayscale(0%);
    }

    .attorney__content {
      &::after {
        opacity: 1;
      }

      .attorney__designation {
        margin-bottom: 8px;
      }
    }

    .attorney__contact {
      grid-template-rows: 1fr;
      opacity: 1;
    }
  }

  .attorney {
    &__link {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &__image {
      height: 100%;
      filter: grayscale(100%);
      border-radius: 2px;
      overflow: hidden;
      transition: all 0.3s linear;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }

    &__content {
      padding: 8px 8px 4px 8px;
      display: flex;
      position: absolute;
      left: 8px;
      bottom: 8px;
      width: 100%;
      width: calc(100% - 16px);
      background-color: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(2px);
      flex-direction: column;
      z-index: 2;
      text-align: start;
      border-radius: 2px;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.33) 4.46%,
          rgba(255, 255, 255, 0.6) 85.92%
        );
        opacity: 0;
        z-index: -1;
        transition: all 0.3s linear;
      }

      ${ContactBox} {
        margin: 0;
        row-gap: 4px;
        min-height: 0;

        a,
        .contact-offices {
          align-items: center;
          column-gap: 4px;
          font-size: ${rem(12)};
          line-height: 16px;
          font-weight: 500;
          font-family: var(--font-poppins);
          color: ${globalColor.blue.darkBlue};

          &:hover {
            > span {
              text-decoration: underline;
            }
          }

          span {
            text-decoration: none;
          }

          svg {
            fill: ${globalColor.blue.darkBlue};
            width: 12px;
            height: 12px;
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

    &__designation {
      margin: 0;
      color: ${globalColor.blue.darkBlue};
      font-family: var(--font-poppins);
      font-size: ${rem(10)};
      line-height: 12px;
      font-weight: 400;
      transition: all 0.125s linear;
    }

    &__contact {
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
      opacity: 0;
      transition: all 0.3s linear;
    }
  }
`;

export const PracticeAttorneysCardName = styled.h3`
  margin: 0 0 2px 0;
  font-size: ${rem(14)};
  line-height: 14px;
  font-weight: 500;
  color: ${globalColor.blue.darkBlue};
  font-family: var(--font-poppins);
`;

export const PracticeNoAttorneys = styled.div`
  margin: 16px 0;
  font-size: ${rem(18)};
  font-weight: 700;
  text-align: center;
`;
