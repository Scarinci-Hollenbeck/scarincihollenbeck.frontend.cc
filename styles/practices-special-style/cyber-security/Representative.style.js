import styled from "styled-components";
import { cyberSecurityColors, globalColor, rem } from "styles/global_styles/Global.styles";
import { media_breakpoint_down } from "styles/mediaBreakpoints.style";

export const RepresentativeSection = styled.section`
  padding: 140px 0;
  position: relative;
  overflow: hidden;

  ${media_breakpoint_down('xxl')} {
    padding: 120px 0;
  }

  ${media_breakpoint_down('xl')} {
    padding: 100px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 80px 0;
  }
`;
export const RepresentativeBg = styled.div`
  position: absolute;
  left: -30%;
  bottom: -30%;
  z-index: -1;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: ${globalColor.white};
  }
`;
export const RepresentativeHolder = styled.div`
  display: flex;
  flex-direction: column;

  .bage {
    margin-bottom: 16px;
    padding: 5px 20px;
    color: ${cyberSecurityColors.cyberSecurityColorDarkGray};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(14)};
    font-weight: 300;
    line-height: 20px;
    background-color: ${cyberSecurityColors.cyberSecurityColorLightGray};
    border-radius: 42px;
    align-self: flex-start;
  }

  h2 {
    margin-bottom: 36px;
    color: ${cyberSecurityColors.cyberSecurityColorBlack};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(48)};
    font-weight: 500;
    line-height: 72px;

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(36)};
      line-height: 54px;
    }

    ${media_breakpoint_down('md')} {
      margin-bottom: 24px;
      font-size: ${rem(28)};
      line-height: 42px;
    }
  }

  p {
    color: ${cyberSecurityColors.cyberSecurityColorBlack};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(18)};
    line-height: 26px;
    font-weight: 400;

    a {
      color: ${cyberSecurityColors.cyberSecurityColorBlue};
    }

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(16)};
    }
  }
`;
export const RepresentativeInfo = styled.div`
  margin-top: 20px;
  padding: 30px;
  border: 1px solid ${globalColor.white};
  background: rgba(255, 255, 255, 0.11);
  box-shadow: 2px 1px 8px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);

  ${media_breakpoint_down('md')} {
    margin-top: 8px;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 28px;

    ${media_breakpoint_down('md')} {
      row-gap: 24px;
    }

    li {
      display: flex;
      font-family: var(--font-poppins), sans-serif;
      color: ${cyberSecurityColors.cyberSecurityColorBlack};
      font-size: ${rem(18)};
      line-height: 26px;
      font-weight: 400;

      ::before {
        content: '•';
        color: ${cyberSecurityColors.cyberSecurityColorBlack};
        margin-right: 0.5em;
      }

      ${media_breakpoint_down('xxl')} {
        font-size: ${rem(16)};
      }
    }
  }

  > a {
    font-family: var(--font-poppins), sans-serif;
    color: ${cyberSecurityColors.cyberSecurityColorBlack};
    font-size: ${rem(18)};
    line-height: 26px;
    font-weight: 600;

    :hover {
      text-decoration: underline;
    }

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(16)};
    }
  }
`;

