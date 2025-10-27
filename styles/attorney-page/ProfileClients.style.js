import styled from 'styled-components';
import {
  customListMarker,
  globalColor,
  globalTransition,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileClientsList = styled.ul`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 24px;

  ${media_breakpoint_down('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media_breakpoint_down('md')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProfileClientsListItem = styled.li`
  text-transform: capitalize;
  ${customListMarker};

  a {
    color: inherit;
    font-weight: 500;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;
