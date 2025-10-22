import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileAsideItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:empty {
    display: none;
  }

  ${media_breakpoint_down('lg')} {
    flex-direction: row;
    flex-wrap: wrap;

    & > :nth-child(1n) {
      gap: 16px;
      flex: 1 1 calc((100% - 16px) / 2);

      ${media_breakpoint_down('md')} {
        flex: 1 1 100%;
      }
    }
  }
`;
