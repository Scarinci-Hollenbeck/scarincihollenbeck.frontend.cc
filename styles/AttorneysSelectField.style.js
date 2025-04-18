import styled from 'styled-components';
import { globalColor } from './global_styles/Global.styles';

export const AttorneySelectFieldDropdown = styled.ul`
  position: absolute;
  z-index: 1000;
  background: ${globalColor.white};
  border: 1px solid ${globalColor.gray.gray300};
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const AttorneySelectFieldDropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${globalColor.graySmoke.liteWhiteSmoke};
  }
`;

export const AttorneySelectFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;
