import styled, { keyframes } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from '../global_styles/Global.styles';
import {
  media_breakpoint_down,
} from '../mediaBreakpoints.style';
import { StandardBlueButton } from 'styles/Buttons.style';
import { ChildrenBox, ModalContent } from 'styles/ModalWindow.style';

export const Front = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: relative;
  top: 0;
  left: 0;
  transition: 0.5s;
  transform: ${({ isRotateProp }) =>
    isRotateProp ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

export const Back = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  transition: 0.5s;
  transform: ${({ isRotateProp }) =>
    isRotateProp ? 'rotateY(360deg)' : 'rotateY(180deg)'};
  position: absolute;

  video {
    width: inherit;
    height: -webkit-fill-available;
  }
`;

// Styles for new bio page
export const ProfileHeaderSection = styled.section`
  padding-bottom: 60px;

  .breadcrumb-container {
    margin: 12px 0;
    padding: 0;

    > li {

      > a {
        font-size: ${rem(14)};
        color: ${globalColor.gray.gray500};

        &:hover {
          color: ${globalColor.gray.gray110};
        }
      }

      > span {
        font-size: ${rem(14)};
        color: ${globalColor.gray.gray110};
      }
    }
  }
  
  ${media_breakpoint_down('md')} {
    padding-bottom: 40px;
  }
`;

export const ProfileHeaderHolder = styled.div`
  display: flex;
  column-gap: 52px;

  ${media_breakpoint_down('xxl')} {
    column-gap: 40px;
  }

  ${media_breakpoint_down('xl')} {
    column-gap: 24px;
  }

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
    row-gap: 24px;
  }

  ${media_breakpoint_down('md')} {
    row-gap: 20px;
  }
`;

//Left side styles
export const ProfileHeaderLeft = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  ${StandardBlueButton} {
    border-radius: ${globalBorderRadius.small};
  }

  ${media_breakpoint_down('xxl')} {
    width: 400px;
  }

  ${media_breakpoint_down('lg')} {
    width: 100%;
    flex-direction: row;
    column-gap: 20px;
  }

  ${media_breakpoint_down('md')} {
    flex-direction: column;
    row-gap: 20px;
  }
`;

//Image and Video styles
export const CardImageVideoContainer = styled.div`
  width: 100%;
  position: relative;

  ${ModalContent} {
    padding: 0;
    background-color: ${globalColor.blue.darkBlue};
    border-radius: ${globalBorderRadius.small};
  }

  .modal-closer {
    color: ${globalColor.white};
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 1;
  }

  ${ChildrenBox} {
    margin: 0;
    padding: 0;
  }

  ${media_breakpoint_down('lg')} {
    width: 324px;
  }

  ${media_breakpoint_down('md')} {
    width: 351px;
    margin: 0 auto;
  }

  ${media_breakpoint_down('sm')} {
    width: 100%;
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  border-radius: ${globalBorderRadius.small};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_down('lg')} {
    position: relative;
    height: 100%;

    img {
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  ${media_breakpoint_down('md')} {
    position: static;

    img {
      position: static;
    }
  }
`;

export const CardVideoWrapper = styled.div`
  max-width: 90dvw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 100%;
  }
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

export const VideoButtonStyled = styled.button`
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.70) 47.26%, rgba(255, 255, 255, 0.88) 100%);
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
  }

  @media (hover:hover) {
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
`;

export const ProfileActions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: inherit;

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const ProfileButtons = styled.div`
  display: flex;
  gap: 16px;

  .white-button {
    flex: 1 1 50%;
  }

  ${media_breakpoint_down('lg')} {
    gap: 12px;

    .white-button {
      min-width: fit-content;
    }
  }
`;

export const AddressBox = styled.address`
  margin: 0;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.blue.blue6002};
  box-shadow: 0px -7px 16px 0px rgba(0, 0, 0, 0.06), -10px 10px 19px 0px rgba(0, 0, 0, 0.06);

  .contacts-title {
    margin: 0;
    color: ${globalColor.white};
    font-family: var(--font-lato);
    font-size: ${rem(12)};
    line-height: 1.67;
    font-weight: 400;
    text-transform: uppercase;
  }

  .contacts-list {
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  .contacts-item, .contacts-link {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${rem(14)};
    color: ${globalColor.white};
    transition: ${globalTransition.default};
  }

  .contacts-item {
    &:has(.contacts-link:hover) {
      svg {
        color: ${globalColor.white};
      }
    }
  }

  .contacts-link {
    &:hover {
      color: ${globalColor.blue.skyBlue};

      svg {
        color: ${globalColor.white};
      }
    }
  }

  svg {
    color: ${globalColor.blue.skyBlue};
    width: 20px;
    height: 20px;
    transition: ${globalTransition.default};
  }
`;

//Right side styles
export const ProfileHeaderRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const ProfileTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
`;

export const ProfileName = styled.h1`
  margin: 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(32)};
  line-height: 1.38;
  font-weight: 600;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(20)};
    line-height: 1.4;
  }
`;

export const ProfileDesignation = styled.span`
  margin: 4px 0 2px 0;
  color: ${globalColor.gray.gray110};
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  column-gap: inherit;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }

  ${media_breakpoint_down('sm')} {
    margin: 2px 0 0 0;
    font-size: 1rem;
  }
`;

// Services styles

export const ProfileServicesWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.08);
`;

export const ProfileServicesTitle = styled.h2`
  margin: 0;
  color: ${globalColor.blue.blue500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
`;

export const ProfileServicesContent = styled.ul`
  margin: 0;
  column-gap: 12px;
  list-style: disc;
  column-count: 3;

  ${media_breakpoint_down('xl')} {
    column-count: 2;
  }

  ${media_breakpoint_down('sm')} {
    column-count: 1;
  }
`;

export const ProfileServicesChair = styled.div`
  margin: 0 0 4px -16px;
  padding: 4px 12px;
  background-color: ${globalColor.blue.blue500};
  border-radius: 0px ${globalBorderRadius.small} ${globalBorderRadius.small} 0px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  break-inside: avoid;

  &.co-chair {
    break-before: avoid;
  }
`;

export const ProfileServicesChairTitle = styled.h3`
  margin: 0;
  color: ${globalColor.white};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  font-weight: 400;
  writing-mode: vertical-lr;
  transform:rotate(180deg);
  border-left: 1px solid ${globalColor.blue.blue400};
`;

export const ProfileServicesChairList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const ProfileServicesChairItem = styled.li`
  font-size: ${rem(14)};
  color: ${globalColor.white};

  > a {
    color: inherit;
    font-size: inherit;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const ProfileServicesItem = styled.li`
  margin: 0 0 4px 20px;
  font-size: ${rem(14)};
  color: ${globalColor.blue.darkBlue};
  break-inside: avoid;

  &::marker {
    color: ${globalColor.blue.blue400};
  }

  > a {
    color: inherit;
    font-size: inherit;
    font-weight: 400;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }

  ${media_breakpoint_down('sm')} {
    margin-bottom: 7px;
  }
`;

export const ProfileBio = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  ${media_breakpoint_down('sm')} {
    row-gap: 4px;
  }
`;

export const ProfileBioTitle = styled.h2`
  margin: 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(20)};
  font-weight: 600;
  line-height: 1.6;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(18)};
    line-height: 1.56;
  }
`;

export const ProfileBioText = styled.p`
  margin: 0;
  color: ${globalColor.gray.gray110};
  font-size: 1rem;
  line-height: 1.5;

  p {
    &:last-child {
      margin: 0;
    }
  }

  ${media_breakpoint_down('sm')} {
    font-size: 0.875rem;
  }
`;

export const ProfileBioListItems = styled.div`
  display: flex;
  gap: 24px;

  ${media_breakpoint_down('sm')} {
    flex-direction: column;
    row-gap: 8px;
  }
`;

export const ProfileBioListItem = styled.div`
  width: 50%;
  padding: 8px 16px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.08);
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ${media_breakpoint_down('sm')} {
    width: 100%;
  }
`;

const profileBioListTitleStyles = `
  margin: 0;
  color: ${globalColor.blue.blue500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  font-weight: 400;
`;

export const ProfileBioListTitle = styled.h2`
  ${profileBioListTitleStyles};
`;

export const ProfileBioListContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .bullets-li {
    padding-left: 0;
    position: static;

    &::before {
      content: none;
    }
  }

  ul {
    margin: 0;
    list-style: disc;
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    li {
      margin: 0 0 0 20px;
      font-size: ${rem(14)};
      color: ${globalColor.blue.darkBlue};

      &::marker {
        color: ${globalColor.blue.blue400};
      }
    }
  }

  p {
    ${profileBioListTitleStyles};
    margin-top: 4px;
    
    * {
      text-decoration: none !important;
      font-weight: 400 !important;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    row-gap: inherit;
  }
`;