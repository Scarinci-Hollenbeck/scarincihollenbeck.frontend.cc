import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SubHeaderLocationsHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;

  ${media_breakpoint_down('sm')} {
    flex-direction: column;
    row-gap: 16px;
  }
`;
