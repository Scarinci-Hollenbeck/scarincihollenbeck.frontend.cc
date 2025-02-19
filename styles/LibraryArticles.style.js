import styled from 'styled-components';
import { globalColor, globalShadow } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const SideBarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  box-shadow: ${globalShadow.allSideShadow};
  padding: 25px 20px;

  nav {
    margin-bottom: 20px;

    h4 {
      margin-right: 0;
    }

    .second-hr {
      width: 26%;
    }

    ${media_breakpoint_down('lg')} {
      .second-hr {
        width: 66%;
      }
    }

    ${media_breakpoint_down('md')} {
      .second-hr {
        width: 56%;
      }
    }

    ${media_breakpoint_down('md')} {
      .second-hr {
        width: 36%;
      }
    }
  }

  ul {
    li {
      display: flex;
      gap: 5px;
      color: ${globalColor.gray.gray60};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
