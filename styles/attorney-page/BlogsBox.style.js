import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const BlogsBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const BlogsBoxList = styled.div`
  --news-list-gap: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--news-list-gap);

  ${media_breakpoint_down('xl')} {
    --news-list-gap: 12px;
  }
`;
