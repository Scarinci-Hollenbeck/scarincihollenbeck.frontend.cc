import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  rem,
} from './global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from './mediaBreakpoints.style';

export const AttorneysAreaContainer = styled.div`
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : 'auto')};
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 188px);
  align-items: end;

  ${media_breakpoint_exactly_down(1850)} {
    gap: 12px;
  }

  ${media_breakpoint_exactly_down(1439)} {
    gap: 20px;
  }

  ${media_breakpoint_down('md')} {
    justify-content: flex-start;
  }

  ${media_breakpoint_down('sm')} {
    gap: 0;
    grid-template-columns: repeat(auto-fit, 175px);
  }
`;

export const AttorneysAreaChair = styled.div`
  height: 100%;
  margin: 0;
  background-color: ${globalColor.blue.blue500};
  border-radius: ${globalBorderRadius.extraSmall};
`;

export const AttorneyAreaTitle = styled.h3`
  padding: 2px 4px 0;
  margin: 0;
  color: ${globalColor.gray.gray10};
  font-family: var(--font-poppins);
  font-size: ${rem(20)};
  line-height: 32px;
  font-weight: 600;
`;
