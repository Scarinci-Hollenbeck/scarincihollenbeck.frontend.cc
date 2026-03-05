import styled from 'styled-components';
import {
  media_breakpoint_down,
  media_breakpoint_exactly,
} from './mediaBreakpoints.style';
import {
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import Link from 'next/link';
import { ModalContainer } from './ModalWindow.style';

const HeaderTopLineItemStyles = `
  padding: 4px 4px 2px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${globalColor.white};
  font-size: ${rem(16)};
  font-weight: 600;
  line-height: 1.5;
  border-bottom: 2px solid transparent;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      border-color: ${globalColor.blue.skyBlue};

      > span {
        color: ${globalColor.blue.skyBlue};
      }
    }
  }

  &:hover {
    color: ${globalColor.white};
  }

  &:active {
    border-color: ${globalColor.blue.skyBlue};
    color: ${globalColor.blue.skyBlue};

    > span {
      color: ${globalColor.blue.skyBlue};
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 4px 0;
    font-size: ${rem(14)};
    line-height: 1.42;
  }
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: flex-start;

  ${media_breakpoint_down('md')} {
    display: ${({ $isHide }) => ($isHide ? 'none' : 'flex')};
  }
`;

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${globalColor.white};
  position: sticky;
  top: 0;
  z-index: 1020;
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.22);
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;

  &.hide {
    transform: translateY(-48px);

    ${ModalContainer} {
      transform: translateY(48px);
    }

    ${media_breakpoint_down('md')} {
      transform: translateY(-38px);

      ${ModalContainer} {
        transform: translateY(38px);
      }
    }
  }

  @media print {
    display: none;
  }
`;

export const HeaderTopLineWrapper = styled.div`
  padding: 4px 0;
  background-color: ${globalColor.blue.darkBlue};
  width: 100%;
  position: relative;
  z-index: 10;
`;

export const HeaderTopLineItems = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  ${media_breakpoint_down('md')} {
    gap: 16px;
  }
`;

export const HeaderTopLineItem = styled.li`
  width: ${({ $open }) => ($open ? '100%' : '')};
  animation: slideFromTop 0.3s ease forwards;

  @keyframes slideFromTop {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header-subscription-btn {
    ${HeaderTopLineItemStyles}
  }

  &.mobile-hide {
    ${media_breakpoint_down('md')} {
      display: none;
    }
  }
`;

export const HeaderTopLineLink = styled(Link)`
  ${HeaderTopLineItemStyles}
`;

export const HeaderTopLineIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  transition: ${globalTransition.default};

  > svg {
    width: 100%;
    height: 100%;
  }

  ${media_breakpoint_down('md')} {
    display: none;
  }
`;

export const HeaderSearchWrapper = styled.div`
  height: 40px; // fixed because we used dynamic import for search component and without it we see jump
  position: relative;
  margin: 0 auto;
  max-width: 876px;
  display: flex;
  align-items: center;
  width: 100%;

  ${media_breakpoint_down('md')} {
    width: ${({ $open }) => ($open ? '100%' : 'fit-content')};
    height: 36px;
  }

  > div {
    position: relative;
    z-index: 10;
  }
`;

export const SearchOpener = styled.button`
  aspect-ratio: 1 / 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${globalColor.white};
  border-radius: 4px;
  color: ${globalColor.gray.gray110};

  > svg {
    width: 24px;
    height: 24px;
  }
`;

export const HeaderMain = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${globalColor.white};

  > .navbar-wrapper {
    ${media_breakpoint_down('lg')} {
      display: none;
    }
  }
`;

export const HeaderMainButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${media_breakpoint_down('md')} {
    width: ${({ $wide }) => ($wide ? '100%' : '')};
  }

  ${HeaderSearchWrapper} {
    ${media_breakpoint_exactly(769)} {
      display: none;
    }
  }

  .contact-header-btn {
    ${media_breakpoint_down('md')} {
      display: none;
    }
  }
`;
