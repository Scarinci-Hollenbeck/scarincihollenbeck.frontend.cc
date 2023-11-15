import styled from 'styled-components';
import { globalColor, rem } from './global_styles/Global.styles';

export const ContentTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  background-color: white;
  color: ${globalColor.black};
  padding: 3px;
  border-radius: 4px;
  font-size: ${rem(14)};
  font-weight: 400;
  white-space: normal;
  word-wrap: break-word;
`;

export const TooltipWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
