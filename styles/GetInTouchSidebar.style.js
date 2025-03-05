import styled from 'styled-components';
import { ShareSocialBox, SocialHr } from 'styles/library/SocialShare.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const GetInTouchHolder = styled.div`
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.blue.blue6002};
  color: ${globalColor.white};
  display: flex;
  overflow: hidden;
  position: sticky;
  top: calc(var(--header-height) + 70px);
  max-height: calc(100dvh - 230px);
  transition: all 0.3s ease-in-out;

  ${ShareSocialBox} {
    --main-socials-color: ${globalColor.white};
    --socials-svg-size: 20px;
  }

  ${SocialHr} {
    width: calc(100% + 16px);
    margin-left: -16px;
  }
`;

export const GetInTouchDescription = styled.div`
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  p {
    margin: 0;
  }

  ${media_breakpoint_down('xl')} {
    display: none;
  }
`;

export const GetInTouchText = styled.div`
  font-size: ${rem(14)};
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const GetInTouchQuote = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: ${globalColor.blue.blue550};
  border-radius: ${globalBorderRadius.middle};
  box-shadow: 0px 4px 12px 0px rgba(10, 62, 108, 0.06);
  font-style: italic;
`;

export const GetInTouchMobileBtn = styled.button`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  padding: 20px 12px;
  cursor: pointer;
  background-color: ${globalColor.blue.blue550};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      span {
        color: ${globalColor.white};
      }

      svg {
        color: ${globalColor.white};
      }
    }
  }

  &:active {
    span {
      color: ${globalColor.white};
    }

    svg {
      color: ${globalColor.white};
    }
  }

  span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    color: ${globalColor.blue.skyBlue};
    font-family: var(--font-poppins);
    font-size: ${rem(24)};
    line-height: 1.34;
    font-weight: 400;
    transition: ${globalTransition.default};

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(16)};
      line-height: 20px;
      font-weight: 400;
    }
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${globalColor.blue.skyBlue};
    transition: ${globalTransition.default};

    ${media_breakpoint_down('sm')} {
      width: 24px;
      height: 24px;
    }
  }

  ${media_breakpoint_down('sm')} {
    padding: 8px 6px;
    row-gap: 12px;
  }
`;
