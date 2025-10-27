import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';
import { ChildrenBox, ModalContent } from 'styles/ModalWindow.style';

export const ProfileImageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;

  ${ModalContent} {
    padding: 0;
    background-color: ${globalColor.blue.darkBlue};
    border-radius: ${globalBorderRadius.small};
    overflow: unset;
    max-height: calc(100dvh - 100px);
  }

  .modal-closer {
    color: ${globalColor.white};
    position: absolute;
    right: -4px;
    top: -40px;
    z-index: 1;
  }

  ${ChildrenBox} {
    margin: 0;
    padding: 0;
    border-radius: inherit;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: ${globalBorderRadius.small} ${globalBorderRadius.small} 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_down('xxl')} {
    height: 400px;
  }

  ${media_breakpoint_down('lg')} {
    height: 360px;
    border-radius: ${globalBorderRadius.small};
  }

  ${media_breakpoint_down('md')} {
    margin: 0 auto;
    max-width: 360px;
    width: 100%;
  }
`;

export const ProfileImageVideoWrapper = styled.div`
  width: 80dvw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > div {
    width: 100% !important;
    height: 100% !important;
  }

  lite-youtube {
    width: 100%;
    height: 100%;
    max-width: 100%;
  }

  ${media_breakpoint_down('md')} {
    width: 95dvw;
  }
`;

export const ProfileImageBg = styled(Image)`
  position: absolute;
  top: -48px;
  left: -132px;
  width: calc(100% + 132px);
  height: calc(100% + 48px);
  z-index: -1;
  opacity: 0.1;
  object-fit: cover;
`;

const shake = keyframes`
  1%, 9% {
    transform: translate3d(-1px, 0, 0);
  }

  2%, 8% {
    transform: translate3d(2px, 0, 0);
  }

  3%, 5%, 7% {
    transform: translate3d(-4px, 0, 0);
  }

  4%, 6% {
    transform: translate3d(4px, 0, 0);
  }
`;

const wave = keyframes`
  0%, 100% {
    background-position: 100% 0;
  }
  50% {
    background-position: 0 0;
  }
`;

export const ProfileImageButtonStyled = styled.button`
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 40px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 47.26%,
    rgba(255, 255, 255, 0.88) 100%
  );
  background-size: 200% 100%;
  z-index: 4;
  transition: ${globalTransition.default};
  animation: ${wave} 10s infinite;

  .button-label {
    color: ${globalColor.blue.darkBlue};
    font-weight: 500;
    transition: ${globalTransition.default};
  }

  .button-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${({ $isShowVideo }) => !$isShowVideo && shake} 10s
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both 4s infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

    svg {
      width: 100%;
      height: 100%;
    }

    ${media_breakpoint_down('md')} {
      width: 32px;
      height: 32px;
    }
  }

  @media (hover: hover) {
    :hover {
      background-color: rgba(255, 255, 255, 0.88);

      .button-label {
        color: ${globalColor.blue.blue500};
      }
    }
  }

  :active {
    background-color: rgba(255, 255, 255, 0.88);

    .button-label {
      color: ${globalColor.blue.blue500};
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 12px 16px;
  }
`;

export const ProfileImageButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;

  ${media_breakpoint_down('md')} {
    ${ProfileImageButtonStyled} {
      margin: 0 auto;
      max-width: 360px;
    }
  }
`;
