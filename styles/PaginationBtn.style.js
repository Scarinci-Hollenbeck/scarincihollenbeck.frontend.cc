import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { globalColor, rem } from './global_styles/Global.styles';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -20px;
  left: -10px;

  .arrows-bold {
    font-size: ${rem(20)};
    position: relative;
    left: 6px;
    top: 1px;

    svg {
      font-size: 15px;
      position: relative;
      right: 6px;
    }
  }
`;

export const PaginationBtn = styled(Button)`
  svg {
    color: ${globalColor.white};
    width: 33px;
    font-size: 33px;
  }

  :disabled {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    cursor: default;
  }
`;
