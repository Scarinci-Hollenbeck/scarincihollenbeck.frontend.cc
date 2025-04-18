import styled from 'styled-components';
import { globalColor, globalTransition } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  background-color: ${globalColor.transparentBlack.modal};
  position: fixed;
  z-index: ${({ $isOpen }) => ($isOpen ? 1055 : -1)};
  top: 0;
  left: 0;
  pointer-events: all;
  transition: 0.5s opacity, scale;
  scale: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${globalColor.white};
  pointer-events: all;
  transition: ${({ $isDisableTransition }) =>
    $isDisableTransition ? 'none' : '0.8s'};
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0)')};
  overflow: auto;
  max-height: calc(100dvh - 50px);
  position: relative;
`;

export const ModalCloser = styled.button`
  --icon-size: 24px;
  --icon-wrapper-size: 40px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0;
  padding: 0;
  width: var(--icon-wrapper-size);
  height: var(--icon-wrapper-size);
  background: transparent;
  transition: ${globalTransition.default};
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    --icon-wrapper-size: 36px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    transform: scale(1, 1);
    background-color: currentColor;
    border-radius: 2px;
    height: 3px;
    width: var(--icon-size);
    transition: all 0.15s linear;
    transform: translateY(-50%);
  }

  &:before {
    top: 50%;
    transform: rotate(45deg);
  }

  &:after {
    top: 50%;
    transform: rotate(-45deg);
  }

  &:hover {
    transform: rotate(90deg);
  }
`;

export const ChildrenBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 5px;
  margin: 0 -5px;
`;
