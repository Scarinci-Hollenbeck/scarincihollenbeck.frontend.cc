import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SubHeaderSubscriptionHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  color: ${globalColor.white};

  button {
    max-width: 240px;
  }

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const SubHeaderSubscriptionContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  p {
    margin: 0;
  }
`;

export const SubHeaderSubscriptionTitle = styled.h2`
  margin: 0;
  font-size: ${rem(24)};
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 400;
  font-family: var(--font-lato);

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
  }
`;
