import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
} from 'styles/global_styles/Global.styles';

export const ProfileClientsList = styled.ul`
  list-style: disc;
  margin: 0;
`;

export const ProfileClientsListItem = styled.li`
  margin-left: 24px;
  text-transform: capitalize;

  a {
    color: inherit;
    font-weight: 500;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;
