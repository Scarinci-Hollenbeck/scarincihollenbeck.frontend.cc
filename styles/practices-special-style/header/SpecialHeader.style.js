import styled from 'styled-components';
import {
  cannabisLawColors,
  cyberSecurityColors,
  globalColor,
  rem,
} from '../../global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from '../../mediaBreakpoints.style';
import { BsSearch } from 'react-icons/bs';
import { LinksBox } from '../../Header.style';

export const SpecialHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1.5%;
  padding-right: 1.5%;
  height: fit-content;
  width: 100%;
  filter: blur(10%);
  background-color: ${cannabisLawColors.cannabisTransparentBlack};
  position: fixed;
  z-index: 1000;
  border-bottom: 4px solid ${cannabisLawColors.cannabisColorGray};

  ${({ headerType }) => 
    headerType === 'entAndMedia' && `
    background: rgba(34, 26, 20, 0.40);
    border-bottom: none;
  `}

  .nav-item > a {
    color: ${cannabisLawColors.cannabisColorGray};
  }

  .navbar-nav .show > .nav-link {
    color: ${globalColor.white};
  }

  .dropdown-menu {
    background-color: ${cannabisLawColors.cannabisColorGray};

    a {
      :hover {
        color: ${cannabisLawColors.cannabisColorGray};
        background-color: ${cannabisLawColors.cannabisColorDarkGray};
      }
    }
  }

  &.cyber-security {
    position: relative;
    background-color: ${globalColor.white};
    border-bottom-width: 3px;
    box-shadow: 0px 4px 22px 0px rgba(0, 0, 0, 0.25);

    .navbar {
      padding-right: 40px;
    }

    .nav-item > a {
      color: ${cyberSecurityColors.cyberSecurityColorBlack};
      font-size: ${rem(18)};
      line-height: ${rem(25)};
      font-weight: 600;
      font-family: var(--font-poppins);
    }

    .navbar-nav .show > .nav-link {
      color: ${cyberSecurityColors.cyberSecurityColorBlack};
    }

    ${() => `
      ${SearchBoxContainer} {
        svg {
          color: ${cyberSecurityColors.cyberSecurityColorBlack};
        }
      }
    `}

    .link-btn-header {
      background-color: ${cyberSecurityColors.cyberSecurityColorBlack};
      border: 2px solid ${cyberSecurityColors.cyberSecurityColorBlack};
      transition: all 0.5s ease;

      :hover {
        color: ${cyberSecurityColors.cyberSecurityColorBlack};
        background-color: ${globalColor.white};

      }
    }

  }

  ${media_breakpoint_exactly_down(1415)} {
    flex-wrap: wrap;
    justify-content: space-between;

    .navContainer {
      display: flex;
      width: 100%;
      order: 3;

      .navbar-nav {
        justify-content: center;
      }
    }
  }

  ${media_breakpoint_exactly_down(1200)} {
    ${({ isChangeOrder }) =>
      isChangeOrder &&
      `
      > :nth-child(3) { order: 3; width: 100%; flex: none; }
  `}
  }

  ${media_breakpoint_down('lg')} {
    padding-top: 10px;
    padding-bottom: 10px;

    .navContainer {
      display: none;
    }
  }

  ${media_breakpoint_exactly_down(700)} {
    .logo-letters {
      display: none;
    }

    ${({ isChangeOrder }) =>
      isChangeOrder &&
      `
      > :nth-child(1) { order: 1; }
      > :nth-child(3) { order: 2; }
      > :nth-child(5) { order: 1; }
  `}
  }
  
`;
export const SearchBoxContainer = styled.div`
  display: ${({ isOpenSearch }) => (isOpenSearch ? 'none' : 'flex')};
  align-items: center;
  position: relative;
  margin-right: 10px;
  margin-left: auto;

  :hover {
    cursor: pointer;
  }
`;
export const SearchOpenBtn = styled(BsSearch)`
  width: 30px;
  height: 30px;
  margin-right: 20%;
  position: absolute;
  z-index: 1;
  right: 0;
  color: ${globalColor.white};
`;

export const VisibleHiddenSearch = styled.div`
  display: ${({ isOpenBlock }) => (isOpenBlock ? 'flex' : 'none')};
  margin: 15px auto 15px auto;
  flex: 1;
  position: relative;

  .search-result-container {
    background-color: ${globalColor.graySmoke.smoke};
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    margin-top: 25px;
  }

  form {
    .form-control {
      display: ${({ isOpenBlock }) => (isOpenBlock ? 'flex' : 'none')};
      padding: 6px 12px;
      background-color: ${globalColor.graySmoke.smoke};
      color: ${globalColor.black};
      border-radius: 25px;
      position: relative;
      z-index: 100;
      box-shadow: inset 200px 200px ${globalColor.graySmoke.smoke},
        inset -200px -200px ${globalColor.graySmoke.smoke};

      :focus-visible,
      :focus,
      :active {
        background-color: ${globalColor.graySmoke.smoke};
        border: none;
        outline: none;
      }
    }

    .form-group {
      svg {
        display: ${({ isOpenBlock }) => (isOpenBlock ? 'flex' : 'none')};
        color: ${globalColor.black};

        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export const LinksBoxSpecial = styled(LinksBox)`
  button {
    .icon {
      color: ${globalColor.white};
    }
  }

  ${media_breakpoint_down('xl')} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
