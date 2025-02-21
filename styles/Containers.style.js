import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const ContainerDefault = styled.div`
  width: min(100%, 1816px);
  max-width: 100%;
  margin: 0 auto;
  padding: 0 80px;

  ${media_breakpoint_down('xl')} {
    padding: 0 32px;
  }

  ${media_breakpoint_down('md')} {
    padding: 0 12px;
  }

  @media print {
    padding: 0;
  }
`;
