import styled, { css } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const AwardsWrapper = styled.section`
  padding: 60px 0;
  background-color: ${({ $isLightVariant }) =>
    $isLightVariant ? 'transparent' : globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const AwardsHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  .custom-prev-button,
  .custom-next-button {
    color: ${({ $isLightVariant }) => !$isLightVariant && globalColor.white};

    &:disabled {
      color: ${({ $isLightVariant }) =>
        !$isLightVariant && globalColor.blue.blue550};
      background-color: transparent;
    }
  }
`;

export const AwardsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    flex-shrink: 0;
    width: max-content;
  }
`;

export const AwardsSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  .disclaimer {
    margin: 0;
    color: ${({ $isLightVariant }) =>
      $isLightVariant ? globalColor.blue.darkBlue : globalColor.white};
    font-weight: 600;
    text-align: center;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
    }
  }
`;

export const AwardCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: ${({ $isLightVariant }) => ($isLightVariant ? '12px' : '16px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${({ $isLightVariant }) =>
    $isLightVariant ? globalColor.gray.gray1002 : globalColor.blue.blue6002};
  overflow: hidden;
  border: 1px solid transparent;
  transition: ${globalTransition.default};

  ${({ $isLink }) =>
    $isLink &&
    css`
      &:hover {
        border-color: ${globalColor.blue.skyBlue};
      }
    `}

  @media print {
    padding-top: 12px;
    border-radius: ${globalBorderRadius.extraSmall};
    break-inside: avoid !important;
  }
`;

export const AwardCardImage = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media_breakpoint_down('md')} {
    width: 144px;
    height: 144px;
  }

  @media print {
    page-break-inside: avoid;
    width: 100px;
    height: 100px;
  }
`;

export const AwardCardContent = styled.div`
  flex: 1;
  width: 100%;
  padding: ${({ $isLightVariant }) =>
    $isLightVariant ? '8px 12px' : '12px 20px'};
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-self: flex-start;
  background-color: ${({ $isLightVariant }) =>
    $isLightVariant ? globalColor.gray.gray10 : globalColor.blue.blue550};

  > p {
    margin: 0;
    color: ${({ $isLightVariant }) =>
      $isLightVariant ? globalColor.blue.darkBlue : globalColor.white};
    font-size: ${({ $isLightVariant }) =>
      $isLightVariant ? rem(16) : rem(18)};
    line-height: ${({ $isLightVariant }) => ($isLightVariant ? 1.5 : 1.56)};
    font-weight: ${({ $isLightVariant }) => ($isLightVariant ? 700 : 500)};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(16)};
      line-height: 1.5;
    }

    @media print {
      font-size: ${rem(10)};
      line-height: 1.5;
      display: block;
      overflow: visible;
      -webkit-line-clamp: unset;
      -webkit-box-orient: initial;
    }
  }

  > span {
    margin-top: auto;
    color: ${({ $isLightVariant }) =>
      $isLightVariant ? globalColor.blue.blue500 : globalColor.blue.skyBlue};
    font-size: ${rem(20)};
    line-height: 1.6;
    font-weight: 600;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(18)};
      line-height: 1.56;
    }

    @media print {
      font-size: ${rem(12)};
      line-height: 1.5;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 8px 12px;
  }

  @media print {
    padding: 8px 12px;
  }
`;

export const AwardsPrintContainer = styled.div`
  .disclaimer {
    color: ${globalColor.blue.darkBlue};
    margin: 8px 0 0 0;
    font-weight: 600;
    text-align: center;
  }
`;

export const AwardsPrintList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;
