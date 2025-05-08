import styled from 'styled-components';
import { ContainerDefault } from 'styles/Containers.style';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const LibrarySubscriptionsSection = styled.section`
  padding-block: 60px;

  ${media_breakpoint_down('xxl')} {
    padding-block: 40px;
  }
`;

export const LibrarySubscriptionsContainer = styled(ContainerDefault)`
  display: flex;
  justify-content: center;
`;
