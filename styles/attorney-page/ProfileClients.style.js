import styled from 'styled-components';
import {
  customListMarker,
  globalColor,
  globalTransition,
} from 'styles/global_styles/Global.styles';

export const ProfileClientsList = styled.ul`
  margin: 0;
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
