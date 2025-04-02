import { Button } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import Link from 'next/link';

export const RedButtonLink = styled.a`
  padding: 15px 40px;
  background-color: ${globalColor.red.darkRed};
  font-weight: 600;
  color: ${globalColor.white};
  text-decoration: none;

  :hover {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const RedButtonBootstrap = styled(RedButtonLink)`
  margin-left: 20px;
`;

export const ClearButton = styled(Button)`
  margin: 0;
  padding: 3px 15px;
  border: 1px solid ${globalColor.gray.gray500};
  border-radius: 4px;
  color: ${globalColor.gray.gray1002};
  font-weight: 600;
  overflow: hidden;
  font-size: inherit;

  :hover {
    border: 1px solid ${globalColor.blue.blue500};
    color: ${globalColor.gray.gray1002};
  }

  :focus {
    border: 1px solid ${globalColor.blue.blue500};
    color: ${globalColor.gray.gray1002};
  }

  :active {
    border: 1px solid ${globalColor.blue.blue500};
    color: ${globalColor.gray.gray1002} !important;
  }
`;

export const StandardBlueButton = styled.button`
  padding: 10px 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.blue.blue500};
  color: ${globalColor.white};
  font-weight: 600;
  position: relative;
  z-index: 0;
  overflow: hidden;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    :hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &:hover {
    color: ${globalColor.white};
  }

  :active {
    color: ${globalColor.white};
    background-color: ${globalColor.blue.darkBlue};
  }

  :disabled {
    pointer-events: none;
    background-color: rgba(22, 69, 135, 0.2);
    opacity: 0.65;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: ${({ $isLightHover }) =>
      $isLightHover
        ? 'linear-gradient(89deg, #377ec4 2.36%, #afdcf5 107.09%)'
        : 'linear-gradient(87deg, #164587 -9.15%, #060b2a 100%)'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }

  ${({ $isLight }) =>
    $isLight &&
    css`
      background-color: ${globalColor.blue.blue200};
      color: ${globalColor.blue.blue6002};

      &:hover {
        color: ${globalColor.white};
      }

      &::after {
        background-image: linear-gradient(
          89deg,
          #377ec4 2.36%,
          ${globalColor.blue.blue200} 107.09%
        );
      }
    `}

  @media print {
    display: none;
  }
`;

export const StandardLightBlueButton = styled(StandardBlueButton)`
  background-color: ${globalColor.blue.blue400};
`;

export const ButtonRed = styled(Link)`
  width: max-content;
  padding: 8px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  border-radius: 4px;
  background-color: ${globalColor.red.newRed};
  color: ${globalColor.white};
  font-weight: 600;
  overflow: hidden;
  position: relative;
  z-index: 0;
  transition: ${globalTransition.default};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(88deg, #8f1b11 -16.23%, #3d0804 102.61%);
    z-index: -1;
    opacity: 0;
    transition: ${globalTransition.default};
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 2px 8px 0px rgba(64, 64, 64, 0.39);

      &::after {
        opacity: 1;
      }
    }
  }

  &:hover {
    color: ${globalColor.white};
  }

  &:active {
    background-color: ${globalColor.red.сoffee};
  }

  ${media_breakpoint_down('sm')} {
    padding: 10px 40px;
    font-size: ${rem(14)};
  }
`;

export const WhiteButtonWrapper = styled.button`
  width: max-content;
  padding: 12px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.white};
  box-shadow: 0px 4px 12px 0px rgba(10, 62, 108, 0.06);
  color: ${globalColor.gray.gray110};
  font-weight: 600;
  transition: ${globalTransition.default};

  &:hover {
    color: ${globalColor.gray.gray110};
    box-shadow: 0px 4px 12px 0px rgba(10, 62, 108, 0.26);
  }

  > .button-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${globalColor.blue.blue500};
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }

  @media print {
    display: none;
  }
`;

export const OutlinedButton = styled.button`
  width: 100%;
  padding: 9px 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${globalColor.white};
  font-weight: 600;
  border-radius: ${globalBorderRadius.small};
  border: 1px solid ${globalColor.gray.gray110};
  background-color: transparent;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      border-color: ${globalColor.blue.blue400};

      svg {
        color: ${globalColor.blue.skyBlue};
      }
    }
  }

  &:active {
    border-color: ${globalColor.blue.blue400};
    color: ${globalColor.blue.skyBlue};

    svg {
      color: ${globalColor.blue.skyBlue};
    }
  }

  svg {
    flex-shrink: 0;
    transition: ${globalTransition.default};

    ${media_breakpoint_down('md')} {
      width: 20px;
      height: 20px;
    }
  }
`;
