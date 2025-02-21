import styled from 'styled-components';
import { ContactBox, InfoBox, LinkBox } from 'styles/AttorneyCard.style';
import { BreadcrumbsListContainer } from 'styles/Breadcrumbs.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';
import { OfficeCardContainer } from '../Locations.style';
import Link from 'next/link';
import { UnderlinedLink } from 'styles/common/Typography.style';

export const attorneyCardForPractices = `
  .attorney-card-box {
    flex: 1;
    padding: 0;
    border: none;
    min-width: auto;
    flex-basis: unset;
    box-shadow: none;

    &:hover {
      box-shadow: none;

      > div {
        h3 {
          color: ${globalColor.white};
        }
      }

      ${LinkBox} {
        img {
          filter: grayscale(0%);
        }
      }
    }

    ${LinkBox} {
      gap: 8px;

      img {
        width: 164px;
        height: 172px;
        filter: grayscale(100%);
        object-fit: cover;
        transition: ${globalTransition.default};
        border-radius: ${globalBorderRadius.extraSmall};

        ${media_breakpoint_down('sm')} {
          width: 126px;
          height: 132px;
        }
      }
    }

    ${InfoBox} {
      h3,
      p {
        font-family: var(--font-poppins);
      }

      h3 {
        margin: 0 0 4px 0;
        color: ${globalColor.white};
        font-size: ${rem(20)};
        line-height: 32px;
        font-weight: 600;
        transition: ${globalTransition.default};

        ${media_breakpoint_down('sm')} {
          font-size: ${rem(14)};
          line-height: 20px;
        }
      }

      p {
        margin: 0 0 auto 0;
        color: ${globalColor.gray.gray10};
        font-size: ${rem(12)};
        line-height: 20px;
        font-weight: 400;
        text-transform: uppercase;
        font-family: var(--font-lato);

        ${media_breakpoint_down('sm')} {
          font-size: ${rem(8)};
          line-height: 12px;
        }
      }
    }

    ${ContactBox} {
      margin: 0;
      row-gap: 8px;

      .contact-offices,
      a {
        margin: 0;
        display: flex;
        align-items: center;
        column-gap: 8px;

        span {
          font-family: var(--font-poppins);
          color: ${globalColor.white};
          font-size: ${rem(14)};
          line-height: 20px;
          font-weight: 500;
          transition: ${globalTransition.default};
          text-decoration: none;

          ${media_breakpoint_down('sm')} {
            font-size: ${rem(12)};
            line-height: 16px;
          }
        }

        svg {
          fill: #afdcf5;
          flex-shrink: 0;
          transition: ${globalTransition.default};
        }
      }

      .contact-offices {
        &:hover {
          svg {
            fill: ${globalColor.blue.skyBlue};
          }
        }
      }

      a {
        &:hover {
          span {
            color: ${globalColor.blue.skyBlue};
          }

          svg {
            fill: ${globalColor.blue.skyBlue};
          }
        }
      }
    }
  }
`;

export const SubHeaderContent = styled.div`
  --subheader-info-maxwidth: 800px;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${BreadcrumbsListContainer} {
    margin: 16px 0 0 0;

    li {
      a {
        color: ${globalColor.grayExtraLite.grayExtraLite50};
        transition: all 0.5s ease;

        &:hover {
          color: #888;
        }
      }

      svg {
        fill: ${globalColor.grayExtraLite.grayExtraLite50};
      }

      span {
        color: #888;
      }

      &.active {
        > a {
          color: #888;
        }
      }

      a,
      span {
        font-size: ${rem(14)};
        line-height: 13px;
      }
    }

    ${media_breakpoint_down('md')} {
      padding: 0;
    }
  }

  ${media_breakpoint_exactly_down(1279)} {
    --subheader-info-maxwidth: 100%;
    padding: 0 32px;
    row-gap: 40px;

    &:last-child {
      padding-bottom: 24px;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 0 12px;
    row-gap: 24px;
  }
`;

export const SubHeaderInfo = styled.div`
  max-width: var(--subheader-info-maxwidth);
  margin: auto 0;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  h1 {
    margin: 0;
    text-transform: capitalize;
    font-weight: 500;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(32)};
      line-height: 1.38;
    }
  }

  ${media_breakpoint_exactly_down(1279)} {
    padding: 0;
  }
`;

export const SubHeaderCategory = styled.div`
  padding: 4px 12px;
  background: ${({ $lineColor }) =>
    $lineColor
      ? `linear-gradient(90deg, ${$lineColor} 0%, rgba(242, 242, 242, 0.00) 100%)`
      : `linear-gradient(90deg, ${globalColor.blue.dirtyBlue} 0%, rgba(242, 242, 242, 0.00) 100%)`};
  color: ${globalColor.white};
  font-style: italic;
  font-weight: 900;
  font-size: ${rem(24)};
  font-family: var(--font-lato);
  text-transform: uppercase;

  p {
    margin: 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 4px 8px;
    font-size: ${rem(20)};
  }
`;

export const SubHeaderAuthor = styled.p`
  margin: 0;
  color: ${globalColor.gray.gray700};
  font-weight: 300;
  font-size: ${rem(16)};

  a {
    &:hover {
      color: ${globalColor.gray.gray700};
    }

    @media (hover: hover) {
      &:hover {
        color: ${globalColor.blue.skyBlue};
      }
    }

    &:active {
      color: ${globalColor.blue.skyBlue};
    }
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const SubHeaderAuthorName = styled.span`
  color: inherit;
  font-weight: 400;
`;

export const SubHeaderDate = styled(SubHeaderAuthor)`
  font-weight: 400;

  span {
    font-weight: 300;
  }
`;

export const SubHeaderSocials = styled.div`
  margin-bottom: 8px;
  max-width: var(--subheader-info-maxwidth);

  ${media_breakpoint_exactly_down(1279)} {
    margin-bottom: 0;
  }
`;

export const SubHeaderDescription = styled.div`
  line-height: 29.5px;

  p {
    margin: 0;
    color: ${globalColor.gray.gray700};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
    line-height: 1.5;
  }
`;

export const SubHeaderInteractive = styled.div`
  flex: 1;
  display: flex;
  padding: 28px 80px 28px 32px;
  background-color: ${({ $bg }) => ($bg ? $bg : globalColor.blue.darkBlue)};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 12px;

  > h2 {
    margin: 0;
    color: ${globalColor.white};
    font-size: ${rem(18)};
    line-height: 28px;
    font-weight: 500;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(16)};
      line-height: 20px;
    }
  }

  .sub-header__contacts {
    flex: 1;
    max-width: 450px;
    border-radius: ${globalBorderRadius.small};
    background-color: ${globalColor.blue.blue6002};

    ${media_breakpoint_exactly_down(1279)} {
      max-width: 100%;
      width: 100%;
    }
  }

  ${OfficeCardContainer} {
    flex: 1;
    padding: 24px;
    background-color: transparent;
    row-gap: 20px;

    .current-office-card-title {
      margin: 0;
      color: ${globalColor.blue.skyBlue};
      font-size: ${rem(24)};
      line-height: 1.5;
      font-family: var(--font-lato);
      text-transform: uppercase;
      font-weight: 400;

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(16)};
      }
    }

    svg {
      fill: ${globalColor.white};
      transition: ${globalTransition.default};
      margin: 0;
    }

    address {
      padding: 0;
      margin: 0;
      font-size: ${rem(16)};
      color: ${globalColor.white};
      row-gap: 12px;
      font-weight: 600;

      > span {
        max-width: 320px;
        text-wrap: balance;
      }

      span {
        align-items: flex-start;
      }

      a {
        color: ${globalColor.white};
        transition: ${globalTransition.default};

        :hover {
          color: ${globalColor.blue.skyBlue};

          svg {
            fill: ${globalColor.blue.skyBlue};
          }
        }
      }

      a,
      span {
        gap: 12px;
      }

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(14)};
      }
    }

    ${media_breakpoint_down('sm')} {
      row-gap: 12px;
      padding: 8px;
    }
  }

  ${media_breakpoint_exactly_down(1279)} {
    padding: 40px 32px;
  }

  ${media_breakpoint_down('lg')} {
    padding: 24px 32px;
  }

  ${media_breakpoint_down('md')} {
    padding: 24px 12px;
  }
`;

export const SubHeaderHolder = styled.section`
  min-height: 340px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: ${globalColor.gray.gray10};
  display: flex;
  column-gap: 32px;

  .sub-header__image {
    flex: 1;
    max-width: 20%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    ${media_breakpoint_exactly_down(1279)} {
      display: none;
    }
  }

  ${media_breakpoint_exactly_down(1850)} {
    gap: 24px;
  }

  ${media_breakpoint_exactly_down(1279)} {
    min-height: unset;
    flex-direction: column;
  }

  &.sub-header--without-image {
    .sub-header__content {
      margin-left: auto;
      max-width: 965px;
      padding-left: 80px;

      ${media_breakpoint_exactly_down(1279)} {
        margin-left: unset;
        max-width: 100%;
        padding: 0 32px;
      }

      ${media_breakpoint_down('md')} {
        padding: 0 12px;
      }
    }

    ${SubHeaderInteractive} {
      min-width: 540px;
      flex: unset;
      width: 45%;

      ${media_breakpoint_exactly_down(1279)} {
        width: 100%;
        min-width: unset;
      }
    }
  }

  &.sub-header--menu {
    ${media_breakpoint_exactly_down(1279)} {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: unset;

      .sub-header__image {
        flex: unset;
        max-width: unset;
        width: 30%;
        order: 1;
        display: block;
      }

      .sub-header__content {
        flex: unset;
        width: 100%;
      }
    }

    ${SubHeaderInteractive} {
      max-width: 595px;

      ${media_breakpoint_down('xxl')} {
        max-width: 540px;
      }

      ${media_breakpoint_exactly_down(1279)} {
        padding: 28px 32px;
        order: 2;
        max-width: 100%;
      }

      ${media_breakpoint_down('md')} {
        padding: 16px;
      }
    }

    &.sub-header--without-image {
      .sub-header__content {
        max-width: 1230px;
      }
    }
  }

  &.sub-header--subscription {
    ${SubHeaderInteractive} {
      max-width: 595px;

      ${media_breakpoint_down('xxl')} {
        max-width: 540px;
      }

      ${media_breakpoint_exactly_down(1279)} {
        max-width: 100%;
      }
    }

    &.sub-header--without-image {
      .sub-header__content {
        max-width: 1230px;
      }
    }
  }

  &.sub-header--article {
    @media print {
      display: none;
    }

    ${SubHeaderInfo} {
      flex: 1;
      padding: 16px 0 8px 0;
      margin: 0;
      gap: 8px;

      ${media_breakpoint_exactly_down(1279)} {
        padding: 28px 0 8px 0;
      }
    }

    ${SubHeaderInfo} {
      h1 {
        margin: auto 0;
      }
    }

    .sub-header__content {
      --subheader-info-maxwidth: 1000px;
      max-width: 1140px;
      row-gap: 0;

      ${media_breakpoint_exactly_down(1279)} {
        --subheader-info-maxwidth: 100%;
        max-width: 100%;
      }
    }

    ${SubHeaderInteractive} {
      width: 36.5%;

      ${media_breakpoint_exactly_down(1279)} {
        width: 100%;
      }
    }
  }
`;
