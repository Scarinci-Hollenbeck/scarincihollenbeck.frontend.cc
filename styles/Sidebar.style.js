import styled from 'styled-components';
import { globalShadow } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const TitleSideBar = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-poppins), sans-serif;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const NavList = styled.ul`
  padding: 0;

  li {
    margin-bottom: 6px;
  }
`;
export const SideBarContainer = styled.div`
  box-shadow: ${globalShadow.allSideShadow};
  height: fit-content;

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }
`;
