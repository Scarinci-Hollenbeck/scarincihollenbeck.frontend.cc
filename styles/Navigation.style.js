import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import {
  customListMarker,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  SidebarMenuItemOpener,
  SidebarMenuSubitemOpener,
} from './Sidebar.style';
import { FiltersHolder, FiltersResults } from './Filters.style';
import { underlinedLinkStyles } from './common/Typography.style';

//New styles for Navigation in Header
export const NavbarWrapper = styled.nav`
  margin: 0 auto;
`;

export const NavbarList = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 32px;

  ${media_breakpoint_down('xl')} {
    gap: 24px;
  }

  ${media_breakpoint_down('lg')} {
    gap: 32px;
  }

  ${media_breakpoint_down('md')} {
    gap: 12px;
  }
`;

export const NavbarItem = styled.li``;

export const NavbarItemOpener = styled.button`
  padding: 4px 0 2px;
  border-bottom: 2px solid transparent;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(18)};
  line-height: 1.55;
  font-weight: 500;
  transition: ${globalTransition.default};

  &.active {
    color: ${globalColor.blue.blue400};
    border-color: currentColor;
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.blue400};
      border-color: currentColor;
    }
  }

  ${media_breakpoint_down('xl')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }

  ${media_breakpoint_down('lg')} {
    font-size: ${rem(18)};
    line-height: 1.55;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const NavbarItemContent = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  background-color: ${globalColor.blue.darkBlue};
  z-index: 0;
  max-height: calc(95dvh - var(--header-height));
  display: flex;
  transition: max-height 0.3s ease-in-out;

  .navbar-container {
    display: flex;
    padding-top: 20px;
    padding-bottom: 40px;

    ${media_breakpoint_down('md')} {
      padding-top: 16px;
      padding-bottom: 24px;
    }
  }

  .services-tabs {
    background-color: ${globalColor.blue.blue500};
  }

  &.navbar-services {
    flex-direction: column;

    .navbar-container {
      overflow: hidden;
    }

    .underlined {
      ${underlinedLinkStyles};
      margin: 4px 0 4px 12px;
      border-radius: 0;
      color: ${globalColor.white};

      &:hover {
        background-color: transparent;
      }

      ${media_breakpoint_down('lg')} {
        margin: 0 0 6px;
      }
    }
  }

  .practices-split {
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: ${globalColor.blue.blue6002};
      z-index: -1;

      ${media_breakpoint_down('lg')} {
        display: none;
      }
    }
  }

  .practices-list {
    width: 100%;

    ${SidebarMenuItemOpener} {
      color: ${globalColor.white};
    }

    ${SidebarMenuSubitemOpener} {
      > span {
        &::after,
        &::before {
          background-color: ${globalColor.white};
        }
      }
    }
  }

  ${FiltersHolder} {
    row-gap: 16px;
  }

  ${media_breakpoint_down('lg')} {
    position: static;
    max-height: 100%;
  }
`;

export const NavbarPracticesHolder = styled.div`
  width: 100%;
  display: flex;
`;

export const NavbarLeftBlock = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const NavbarLeftList = styled.ul`
  padding-right: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const NavbarLeftItem = styled.li``;

export const NavbarLeftItemOpener = styled(Link)`
  padding: 8px 12px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: ${globalColor.white};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  border-radius: 4px;
  text-align: left;
  transition: ${globalTransition.default};

  &:hover {
    background-color: ${globalColor.blue.blue6002};
    color: ${globalColor.white};

    > .item-icon {
      transform: translate(0);
      opacity: 1;
    }
  }

  &.active {
    background-color: ${globalColor.blue.blue6002};
    color: ${globalColor.white};

    > .item-icon {
      transform: translate(0);
      opacity: 1;
    }
  }
`;

export const NavbarLeftItemOpenerIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor.blue.skyBlue};
  transform: translateX(-25%);
  opacity: 0;
  transition: ${globalTransition.default};

  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const NavbarRightBlock = styled.div`
  padding-left: 16px;
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const NavbarRightTitle = styled.p`
  margin: 0;
  color: ${globalColor.white};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  text-decoration: underline;
`;

export const NavbarRightList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const NavbarRightItem = styled.li`
  color: ${globalColor.gray.gray300};
  ${customListMarker};
`;

export const NavbarRightItemLink = styled(Link)`
  color: ${globalColor.gray.gray300};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 400;
  transition: ${globalTransition.default};

  &:hover {
    color: inherit;
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const NavbarServicesTabs = styled.ul`
  padding: 20px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  margin: 0;

  ${media_breakpoint_down('md')} {
    padding: 12px 0;
  }
`;

export const NavbarServicesTabsButton = styled.button`
  color: ${globalColor.white};
  font-size: ${rem(24)};
  line-height: 1.5;
  font-family: var(--font-lato);
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  text-transform: uppercase;
  border-bottom: 1px solid;
  border-color: ${({ isActive }) =>
    isActive ? 'currentColor' : 'transparent'};
  transition: ${globalTransition.default};

  &:hover {
    border-color: currentColor;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
  }
`;

export const NavbarIndustriesHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  ${FiltersResults} {
    min-height: auto;
  }
`;
