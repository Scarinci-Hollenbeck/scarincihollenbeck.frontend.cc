import styled, { keyframes } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from '../global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from '../mediaBreakpoints.style';
import { StandardBlueButton } from 'styles/Buttons.style';
import { ChildrenBox, ModalContent } from 'styles/ModalWindow.style';
import Image from 'next/image';

// Styles for new bio page
export const ProfileHeaderSection = styled.section`
  @media print {
    display: none;
  }

  padding-bottom: 60px;

  .breadcrumb-container {
    margin: 12px 0;
    padding: 0;

    > li {
      > a {
        font-size: ${rem(14)};
        color: ${globalColor.gray.gray140};

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
  position: relative;

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
export const ProfileBgImage = styled(Image)`
  position: absolute;
  top: -48px;
  /* left: -35vw;
  width: calc(100% + 35vw); */
  left: -132px;
  width: calc(100% + 132px);
  height: calc(100% + 48px);
  z-index: -1;
  opacity: 0.1;
  object-fit: cover;

  ${media_breakpoint_down('lg')} {
    width: calc(100% + 64px);
    left: -32px;
  }

  ${media_breakpoint_down('md')} {
    width: calc(100% + 24px);
    left: -12px;
  }
`;

export const CardImageVideoContainer = styled.div`
  width: 100%;
  position: relative;

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
  height: 500px;
  border-radius: ${globalBorderRadius.small};
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
    min-height: 325px;
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

export const ProfileImageButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;
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

  ${media_breakpoint_down('lg')} {
    column-gap: 24px;
  }

  ${media_breakpoint_down('md')} {
    padding: 12px 16px;
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
  box-shadow: 0px -7px 16px 0px rgba(0, 0, 0, 0.06),
    -10px 10px 19px 0px rgba(0, 0, 0, 0.06);
  position: relative;

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

  .contacts-item,
  .contacts-link {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${rem(14)};
    color: ${globalColor.white};
    transition: ${globalTransition.default};
  }
  @media print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .contacts-item {
    &:has(.contacts-link:hover) {
      svg {
        color: ${globalColor.white};
      }
    }

    &.pdf-hidden {
      @media print {
        display: none;
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
    font-size: ${rem(16)};
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

export const ProfileServicesTitle = styled.p`
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
  border-radius: 0 ${globalBorderRadius.small} ${globalBorderRadius.small} 0px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  break-inside: avoid;

  &.co-chair {
    break-before: avoid;
  }
`;

export const ProfileServicesChairTitle = styled.p`
  margin: 0;
  color: ${globalColor.white};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  font-weight: 400;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
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

  p {
    &:last-child {
      margin: 0;
    }
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const ProfileBioListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  &:empty {
    display: none;
  }

  ${media_breakpoint_down('sm')} {
    flex-direction: column;
    row-gap: 8px;
  }
`;

export const ProfileBioListItem = styled.div`
  flex: 1 1 calc((100% - 24px) / 2);
  padding: 8px 16px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0 2px 16px 0 rgba(10, 62, 108, 0.08);
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ${media_breakpoint_down('sm')} {
    flex-shrink: 100%;
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

export const ProfileBioListTitle = styled.h3`
  ${profileBioListTitleStyles};
`;

export const ProfileBioListContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

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

export const ProfileBioListColumns = styled.div`
  --columns-gap: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--columns-gap);
`;

export const ProfileBioListColumn = styled.div`
  flex: 1 1 calc((100% - var(--columns-gap) * 2) / 3);
  padding-right: var(--columns-gap);
  border-right: 1px solid ${globalColor.gray.gray300};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: ${globalColor.blue.darkBlue};

  &:nth-child(3n) {
    padding-right: 0;
    border-right: none;

    ${media_breakpoint_exactly_down(1279)} {
      padding-right: var(--columns-gap);
      border-right: 1px solid ${globalColor.gray.gray300};
    }

    ${media_breakpoint_down('lg')} {
      padding-right: 0;
      border-right: none;
    }
  }

  &:nth-child(2n) {
    ${media_breakpoint_exactly_down(1279)} {
      padding-right: 0;
      border-right: none;
    }

    ${media_breakpoint_down('lg')} {
      padding-right: var(--columns-gap);
      border-right: 1px solid ${globalColor.gray.gray300};
    }

    ${media_breakpoint_down('md')} {
      padding-right: 0;
      border-right: none;
    }
  }

  &:last-child {
    padding: 0;
    border: none;
  }

  ${media_breakpoint_exactly_down(1279)} {
    flex: 1 1 calc((100% - var(--columns-gap)) / 2);
  }

  ${media_breakpoint_down('lg')} {
    flex: 1 1 calc((100% - var(--columns-gap) * 2) / 3);
  }

  ${media_breakpoint_down('md')} {
    flex: 1 1 100%;
    border-right: none;
    padding-right: 0;
    border-bottom: 1px solid ${globalColor.gray.gray300};
    padding-bottom: var(--columns-gap);
  }
`;

export const ProfileBioListColumnSubtitle = styled.p`
  margin: 0;
  text-decoration: underline;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const ProfileBioListColumnTitle = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: inherit;
  line-height: 1.5;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const ProfileBioListColumnText = styled.div`
  p,
  ul {
    &:last-child {
      margin: 0;
    }
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const NewsCardBlock = styled.article`
  min-height: 192px;
  width: ${({ $isWide, $isFull }) =>
    $isFull
      ? '100%'
      : $isWide
      ? 'calc((100% - var(--news-list-gap)) / 2)'
      : 'calc((100% - var(--news-list-gap) * 2) / 3)'};
  background-color: ${globalColor.gray.gray10};
  border-radius: 4px;
  overflow: hidden;

  .news-card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    border-radius: inherit;
    transition: ${globalTransition.default};
  }

  a.news-card-wrapper {
    :hover {
      border-color: ${globalColor.blue.skyBlue};
    }
  }

  p {
    margin-bottom: 0;
  }

  .news-card-video {
    border-radius: 4px 4px 0 0;
    height: 208px;
    width: 100%;

    .video-render,
    video,
    lite-youtube {
      border-radius: 4px 4px 0 0;
      max-width: 100%;
      width: 100%;
      height: 100%;
    }

    video {
      object-fit: cover;
    }
  }

  .news-card-content {
    flex: 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  .news-card-title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(20)};
    line-height: 1.6;
    font-weight: 600;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(18)};
      line-height: 1.56;
    }
  }

  .news-card-text {
    margin-top: auto;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${globalColor.blue.darkBlue};
    font-size: inherit;
    font-weight: 400;
    line-height: 1.5;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  .news-card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  ${media_breakpoint_down('xl')} {
    width: ${({ $isFull }) =>
      $isFull ? '100%' : 'calc((100% - var(--news-list-gap)) / 2)'};
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
  }
`;

const footerLetterStyles = `
  color: ${globalColor.gray.gray110};
  font-size: inherit;
  font-weight: 300;
  line-height: 1.5;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const CardFooterBox = styled.div`
  display: flex;
  margin-top: auto;
  column-gap: 12px;

  .news-card-label {
    ${footerLetterStyles};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    > span {
      font-weight: 400;
    }
  }

  .news-card-date {
    ${footerLetterStyles};
    margin-left: auto;
    font-weight: 600;
    flex-shrink: 0;
  }
`;
