import styled from 'styled-components';
import {
  globalColor,
  globalShadow,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sidebarBtnStyle = `
  padding: 11px 15px;
  border-radius: 4px;
  border: 1px solid ${globalColor.gray.gray500};
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  color: ${globalColor.blue.darkBlue};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.darkBlue};
      border-color: ${globalColor.blue.blue400};

      > span {
        color: ${globalColor.blue.blue400};
      }
    }
  }

  &:hover {
    color: ${globalColor.blue.darkBlue};
  }
  
  &:active {
    color: ${globalColor.blue.blue400};
    border-color: ${globalColor.blue.blue400};

    > span {
      color: ${globalColor.blue.blue400};
    }
  }

  ${media_breakpoint_down('md')} {
    max-width: 50%;
    width: 100%;
    margin: 0 auto;
  }

  ${media_breakpoint_down('sm')} {
    padding: 9px 15px;
    max-width: 100%;
    font-size: ${rem(14)};
  }
`;

//Styles for sidebar menu in Header
export const SidebarOpener = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  background: transparent;

  ${media_breakpoint_down('md')} {
    display: ${({ $isHide }) => ($isHide ? 'none' : 'flex')};
    width: 36px;
    height: 36px;
  }

  &:before,
  &:after {
    content: '';
  }

  &:before,
  &:after,
  .burger-line {
    position: absolute;
    left: 50%;
    transform: scale(1, 1);
    margin-left: -12.5px;
    background: ${globalColor.gray.gray110};
    border-radius: 2px;
    height: 3px;
    width: 24px;
    transition: all 0.15s linear;
    transform: translateY(-50%);
  }

  &:before {
    top: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? '50%' : 'calc(50% - 8px)'};
    transform: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? 'rotate(45deg)' : ''};
  }

  .burger-line {
    top: 50%;
    transform: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'scale(0, 1)' : '')};
  }

  &:after {
    top: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? '50%' : 'calc(50% + 8px)'};
    transform: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? 'rotate(-45deg)' : ''};
  }
`;

export const SidebarMenuWrapper = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 100%;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${globalColor.white};
  z-index: 2;
  overflow: auto;
  overscroll-behavior: contain;

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }

  .navbar-wrapper {
    display: none;
    margin: 0 0 0 -32px;
    width: calc(100% + 64px);
    background-color: ${globalColor.blue.darkBlue};

    ${media_breakpoint_down('lg')} {
      display: block;
    }

    ${media_breakpoint_down('md')} {
      width: calc(100% + 24px);
      margin-left: -12px;
    }
  }

  .navbar-list {
    padding: 16px 32px;
    justify-content: center;

    ${media_breakpoint_down('md')} {
      padding: 12px;
      justify-content: space-evenly;
    }
  }

  .navbar-opener {
    color: ${globalColor.white};

    &.active {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const SidebarMenuContainer = styled.div`
  max-width: 908px;
  width: 100%;
  margin: 0 auto 0 0;
  padding: 0 80px 0 40px;

  ${media_breakpoint_down('xl')} {
    padding-right: 32px;
    padding-left: 32px;
  }

  ${media_breakpoint_down('lg')} {
    max-width: 100%;
  }

  ${media_breakpoint_down('md')} {
    padding-right: 12px;
    padding-left: 12px;
  }
`;

export const SidebarMenuBackdrop = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: ${({ $headerHeight }) => `calc(100dvh - ${$headerHeight}px)`};
  background-color: rgba(1, 2, 10, 0.68);

  ${media_breakpoint_down('lg')} {
    display: none;
  }
`;

export const SidebarMenuList = styled.ul`
  margin: 0;
  padding-top: 8px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;

  ${media_breakpoint_down('md')} {
    padding-top: 4px;
  }
`;

export const SidebarMenuItem = styled.li`
  border-bottom: 1px solid ${globalColor.gray.gray10};
  transition: ${globalTransition.default};
  padding-bottom: ${({ $open }) => ($open ? '10px' : '0')};
  overflow: ${({ $open }) => ($open ? 'hidden' : '')};
`;

export const SidebarMenuItemOpener = styled(Link)`
  padding-top: 16px;
  padding-bottom: ${({ $open }) => ($open ? '18px' : '16px')};
  display: flex;
  align-items: center;
  column-gap: 12px;
  color: ${({ $open }) =>
    $open ? globalColor.blue.blue400 : globalColor.blue.darkBlue};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  text-transform: capitalize;
  transition: ${globalTransition.default};

  &:hover {
    color: ${globalColor.blue.blue400};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const SidebarMenuItemIcon = styled.span`
  color: ${globalColor.blue.blue400};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media_breakpoint_down('md')} {
    width: 24px;
    height: 24px;
  }
`;

export const SidebarMenuItemArrow = styled.span`
  margin-left: auto;
  transition: ${globalTransition.default};
  rotate: ${({ $open }) => ($open ? '180deg' : '0deg')};
  color: ${({ $open }) => ($open ? globalColor.blue.blue400 : '')};
`;

export const SidebarMenuItemContent = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  overflow: ${({ $open }) => ($open ? '' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? '' : 'none')};
  transition: ${globalTransition.default};
`;

export const SidebarMenuItemContentList = styled.ul`
  margin: 0;
  min-height: 0;

  .bolder {
    font-weight: 600;
  }
`;

export const SidebarMenuSubitem = styled.li`
  transition: ${globalTransition.default};
  padding-bottom: ${({ $open }) => ($open ? '6px' : '0')};
  overflow: ${({ $open }) => ($open ? 'hidden' : '')};
`;

export const SidebarMenuSubitemOpener = styled(SidebarMenuItemOpener)`
  padding: 6px 0;
  column-gap: 4px;
  color: ${({ $open }) =>
    $open ? globalColor.blue.darkBlue : globalColor.gray.gray110};
  font-weight: 400;

  &:hover {
    color: ${globalColor.blue.darkBlue};
  }
`;

export const SidebarMenuSubitemIcon = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 2px;
    background-color: ${globalColor.gray.gray110};
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 12px;
    background-color: ${globalColor.gray.gray110};
    translate: ${({ $open }) => ($open ? '0 100%' : '')};
    opacity: ${({ $open }) => ($open ? '0' : '1')};
    transition: ${globalTransition.default};
  }
`;

export const SidebarMenuSubitemContentItem = styled.li`
  margin-left: 24px;
`;

export const SidebarMenuSubitemContentLink = styled(SidebarMenuSubitemOpener)``;

export const SidebarMenuLinks = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 20px;

  ${media_breakpoint_down('md')} {
    padding-bottom: 20px;
  }

  ${media_breakpoint_down('sm')} {
    flex-direction: column;
  }
`;

export const SidebarMenuLink = styled(Link)`
  padding: 4px 0;
  color: ${globalColor.blue.darkBlue};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  text-transform: capitalize;
  transition: ${globalTransition.default};

  &:hover {
    color: ${globalColor.blue.blue400};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const SidebarMenuFooter = styled.div`
  margin-top: auto;
  padding: 24px 0;
  background-color: ${globalColor.gray.gray300};

  ${SidebarMenuContainer} {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  ${media_breakpoint_down('md')} {
    padding: 20px 0;
  }
`;

export const SidebarMenuButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 16px;
  justify-content: space-between;

  .sidebar-subscription-btn {
    ${sidebarBtnStyle};
  }

  .sidebar-contact-btn {
    display: none;

    ${media_breakpoint_down('md')} {
      margin: 0 auto;
      display: flex;
      max-width: 50%;
      width: 100%;
    }

    ${media_breakpoint_down('sm')} {
      max-width: 100%;
    }
  }

  ${media_breakpoint_down('md')} {
    flex-direction: column;
  }
`;

export const SidebarMenuButton = styled(Link)`
  ${sidebarBtnStyle};
`;

export const SidebarMenuButtonIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${globalTransition.default};
`;

export const SidebarMenuSocials = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 20px;
  justify-content: center;
`;

export const SidebarMenuSocial = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${globalColor.blue.darkBlue};
  font-size: inherit;
  line-height: 1.5;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.darkBlue};

      > span {
        color: ${globalColor.blue.blue500};
      }
    }
  }

  &:hover {
    color: ${globalColor.blue.darkBlue};
  }

  &:active {
    color: ${globalColor.blue.blue500};

    > span {
      color: ${globalColor.blue.blue500};
    }
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const SidebarMenuSocialIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor.blue.blue400};
  transition: ${globalTransition.default};

  > svg {
    width: 100%;
    height: 100%;
  }
`;
