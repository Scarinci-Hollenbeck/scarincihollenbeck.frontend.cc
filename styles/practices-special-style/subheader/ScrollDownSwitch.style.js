import styled from "styled-components";
import { cyberSecurityColors, globalColor, rem } from "styles/global_styles/Global.styles";

export const ScrollDownText = styled.span`
  font-size: ${rem(18)};
  line-height: ${rem(25)};
  font-family: var(--font-poppins), sans-serif;
  font-weight: 500;
  color: ${cyberSecurityColors.cyberSecurityColorGray};
  letter-spacing: ${rem(0.36)};
  transition: all 0.5s ease;
`;
export const ScrollDownIcon = styled.div`
  width: ${rem(46)};
  height: ${rem(46)};
  background: url('/images/scroll_down_icon.svg') center/cover no-repeat;
  transition: all 0.5s ease;
`;

export const ScrollDownBlock = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  row-gap: ${rem(15)};
  align-items: center;

  :hover {
    ${ScrollDownText} {
      color: ${cyberSecurityColors.cyberSecurityColorBlack};
    }

    ${ScrollDownIcon} {
      background: url('/images/scroll-down-icon-active.svg') center/cover no-repeat;
    }
  }

`;