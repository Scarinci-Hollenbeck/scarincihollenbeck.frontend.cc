import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SelectOpener = styled.button`
  height: 100%;
  position: relative;
  z-index: ${({ $selectActive }) => ($selectActive ? '3' : '1')};
  cursor: pointer;
`;

export const SelectInput = styled.input`
  height: 100%;
  width: 100%;
  padding: 13px 46px 13px 11px;
  background-color: ${globalColor.gray.gray10};
  border: 0;
  outline: 0;
  color: ${globalColor.blue.darkBlue};
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  border-radius: ${({ $selectActive }) =>
    $selectActive ? '4px 4px 0 0' : '4px'};
  pointer-events: none;
  transition: ${globalTransition.default};

  &::placeholder {
    color: ${globalColor.gray.gray110};
    opacity: 1;
  }

  &:focus-visible {
    border: 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 9px 38px 9px 7px;
    font-size: ${rem(14)};
  }
`;

export const SelectIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  rotate: ${({ $selectActive }) => ($selectActive ? '180deg' : '0deg')};
  transform-origin: top;
  transition: ${globalTransition.default};
  cursor: pointer;
`;

export const SelectOptions = styled.ul`
  margin: 0;
  padding: 2px 16px;
  position: absolute;
  top: 99%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 3;
  background-color: ${globalColor.gray.gray300};
  border-radius: 0px 0px 4px 4px;
  max-height: 30dvh;
  overflow: auto;
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.22);
  overscroll-behavior: contain;

  &::-webkit-scrollbar-track {
    background-color: #c5c5c5;
    border-radius: ${globalBorderRadius.small};
    opacity: 0;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${globalColor.gray.gray500};
    border-radius: ${globalBorderRadius.small};
  }

  // FireFox
  @supports not selector(::-webkit-scrollbar-thumb) {
    scrollbar-color: ${globalColor.gray.gray500} rgba(146, 146, 146, 0.38);
    scrollbar-width: thin;
  }
`;

export const SelectOption = styled.button`
  padding: 6px 0;
  width: 100%;
  color: ${globalColor.blue.darkBlue};
  cursor: pointer;
  text-align: start;

  &:focus-visible {
    color: ${globalColor.blue.ultramarine};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;
