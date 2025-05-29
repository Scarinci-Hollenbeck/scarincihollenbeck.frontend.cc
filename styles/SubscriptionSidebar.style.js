import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  rem,
} from './global_styles/Global.styles';
import { Title20 } from './common/Typography.style';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const SubscriptionSidebarHolder = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: ${globalColor.blue.blue6002};
  border-radius: ${globalBorderRadius.small};
  color: ${globalColor.white};
  position: sticky;
  top: calc(var(--header-height) + 8px);
  max-height: calc(100dvh - var(--header-height));
  overflow: auto;
  transition: all 0.3s ease-in-out;

  > button {
    flex-shrink: 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 12px 16px;
  }
`;

export const SubscriptionSidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ${Title20} {
    color: currentColor;
    font-size: ${rem(16)};

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(14)};
    }
  }

  ${media_breakpoint_down('md')} {
    row-gap: 8px;
  }
`;

export const SubscriptionSidebarText = styled.p`
  margin: 0;
  font-size: ${rem(16)};

  ${media_breakpoint_down('xxl')} {
    font-size: ${rem(14)};
  }
`;

export const SubscriptionSidebarBlock = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  border-radius: ${globalBorderRadius.big};
  background-color: ${globalColor.blue.blue550};
  box-shadow: 0px 4px 12px 0px rgba(10, 62, 108, 0.06);
`;

export const SubscriptionSidebarBlockTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: inherit;
  font-weight: 600;
  color: ${globalColor.white};
  font-size: ${rem(16)};

  > span {
    width: 28px;
    height: 28px;
    color: ${globalColor.blue.skyBlue};
  }

  ${media_breakpoint_down('xxl')} {
    font-size: ${rem(14)};
  }
`;

export const SubscriptionSidebarBlockLinks = styled.ul`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  > li {
    width: calc(50% - 4px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: ${rem(16)};

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(14)};
    }
  }

  a {
    color: currentColor;

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;
