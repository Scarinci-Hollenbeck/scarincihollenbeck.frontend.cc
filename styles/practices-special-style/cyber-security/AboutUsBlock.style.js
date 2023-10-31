import styled from "styled-components";
import { cyberSecurityColors, globalColor, rem } from "styles/global_styles/Global.styles";
import { ContainerContent } from "../commonForSpecial.style";
import { ContactBox, InfoBox, UserName } from "styles/AttorneyCard.style";
import { media_breakpoint_down } from "styles/mediaBreakpoints.style";

export const AboutUsSection = styled.section`
  padding: ${rem(120)} 0;
  background-color: ${cyberSecurityColors.cyberSecurityColorBlack};

  ${ContainerContent} {
    display: grid;
    grid-template-columns: 1fr 30%;
    column-gap: ${rem(60)};
  }

  ${media_breakpoint_down('xxl')} {
    padding: ${rem(100)} 0;
  }

  ${media_breakpoint_down('xl')} {
    padding: ${rem(80)} 0;

    ${ContainerContent} {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 0;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: ${rem(64)} 0;
  }
`;

export const WhoWeAre = styled.div`
  margin-bottom: ${rem(80)};
  display: flex;
  flex-direction: column;
  row-gap: ${rem(36)};
  grid-column: span 2;

  ${media_breakpoint_down('md')} {
    margin-bottom: ${rem(40)};
    row-gap: ${rem(24)};
  }
`;
export const WhatWeDo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${rem(36)};
  grid-column: 1 / 2;

  ${media_breakpoint_down('xl')} {
    grid-column: span 2;
  }

  ${media_breakpoint_down('md')} {
    row-gap: ${rem(24)};
  }
`;
export const AboutUsTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${rem(16)};

  .bage {
    width: max-content;
    padding: ${rem(5)} ${rem(20)};
    border-radius: ${rem(42)};
    background-color: ${cyberSecurityColors.cyberSecurityColorDark};
    font-family: var(--font-poppins), sans-serif;
    color: ${cyberSecurityColors.cyberSecurityColorGray};
    font-size: ${rem(14)};
    font-weight: 300;
    line-height: ${rem(20)};
  }

  h2 {
    margin: 0;
    color: ${cyberSecurityColors.cyberSecurityColorLightGray};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(48)};
    font-weight: 500;
    line-height: ${rem(72)};
  }

  ${media_breakpoint_down('xxl')} {
    h2 {
      font-size: ${rem(36)};
      line-height: ${rem(54)};
    }
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(28)};
    line-height: ${rem(42)};
  }
`;
export const AboutUsInfoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${rem(40)};

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
    row-gap: ${rem(28)};
  }
`;
export const AboutUsInfoItem = styled.div`
  width: calc(33.33% - ${rem(28)});
  font-family: var(--font-poppins), sans-serif;
  color: ${cyberSecurityColors.cyberSecurityColorLightGray};

  div {
    margin-bottom: ${rem(16)};
    font-size: ${rem(20)};
    font-weight: 300;
    line-height: ${rem(26)};
  }

  h4 {
    margin-bottom: ${rem(16)};
    color: ${cyberSecurityColors.cyberSecurityColorLightGray};
    font-size: ${rem(18)};
    font-weight: 600;
    line-height: ${rem(26)};
  }

  p {
    margin-bottom: ${rem(8)};
    color: ${globalColor.grayLite.grayLite60};
    font-size: ${rem(18)};
    line-height: ${rem(26)};
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  a {
    color: ${cyberSecurityColors.cyberSecurityColorLightGray};
    font-size: ${rem(16)};
    font-weight: 500;
    line-height: ${rem(24)};

    :hover {
      text-decoration: underline;
    }
  }

  ${media_breakpoint_down('xxl')} {
    p {
      font-size: ${rem(16)};
      line-height: ${rem(26)};
    }
  }

  ${media_breakpoint_down('xl')} {
    width: 100%;
  }
`;
export const AboutUsImage = styled.div`
  width: 100%;
  height: ${rem(500)};
  filter: grayscale(100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media_breakpoint_down('md')} {
    height: ${rem(200)};
  }
`;
export const AboutUsHeader = styled.div`
  display: flex;
  position: relative;
`;
export const AboutUsHeaderLogo = styled.div`
  width: ${rem(150)};
  height: ${rem(150)};
  position: absolute;
  right: ${rem(52)};
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media_breakpoint_down('md')} {
    display: none;
  }
`;
export const AboutUsList = styled.div`
  padding-left: ${rem(140)};

  ${media_breakpoint_down('xxl')} {
    padding-left: ${rem(70)};
  }

  @media (max-width: 1440px) {
    padding-left: 0;
  }
`;
export const AboutUsListDescription = styled.p`
  margin-bottom: ${rem(24)};
  color: ${globalColor.grayLite.grayLite60};
  font-size: ${rem(18)};
  line-height: ${rem(26)};
  font-weight: 400;
  font-family: var(--font-poppins), sans-serif;

  ${media_breakpoint_down('xxl')} {
    margin-bottom: ${rem(40)};
    font-size: ${rem(16)};
    line-height: ${rem(21)};
  }

  ${media_breakpoint_down('md')} {
    margin-bottom: ${rem(24)};
  }
`;
export const AboutUsListItems = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const AboutUsListItem = styled.li`
  padding: ${rem(28)} 0;
  display: flex;
  align-items: center;
  column-gap: ${rem(28)};
  font-family: var(--font-poppins), sans-serif;
  color: ${globalColor.grayLite.grayLite60};
  font-size: ${rem(20)};
  font-weight: 500;
  line-height: ${rem(30)};
  border-top: ${rem(1)} solid ${cyberSecurityColors.cyberSecurityColorDarkGray};
  position: relative;
  transition: all 0.5s ease;
  cursor: default;

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -${rem(60)};
    transform: translate(-100%, -50%);
    width: ${rem(83)};
    height: ${rem(83)};
    background: url('/images/AboutUsListLogo.svg') center/cover no-repeat;
    opacity: 0;
    transition: all .3s ease;
  }

  :hover {
    padding: ${rem(28)} 0 ${rem(28)} ${rem(36)} ;

    ::after {
      opacity: 1;
    }
  }

  ${media_breakpoint_down('xxl')} {
    font-size: ${rem(16)};
    font-weight: 400;
    line-height: ${rem(21)};
    ::after {
      left: -${rem(10)};
      width: ${rem(60)};
      height: ${rem(60)};
    }
  }

  @media (max-width: 1440px) {
    ::after {
      content: none;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: ${rem(24)} 0;
    flex-direction: column;
    align-items: flex-start;
    row-gap: ${rem(12)};

    :hover {
      padding: ${rem(24)} 0 ${rem(24)} ${rem(36)} ;
    }
  }
`;
export const AboutUsListItemNumber = styled.div`
  font-size: ${rem(16)};
  font-weight: 400;
  line-height: ${rem(21)};
  display: flex;
  align-items: center;
  column-gap: ${rem(10)};

  ::before {
    content: '•';
  }
`;

export const AboutUsSidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-area: 2 / 2 / 3 / 3;
  overflow: hidden;

  h3 {
    margin-bottom: ${rem(36)};
    color: ${cyberSecurityColors.cyberSecurityColorLightGray};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(36)};
    line-height: ${rem(54)};
    font-weight: 600;
  }

  .attorney-card-box {
    border: none;
    padding: 16px 0;
    min-width: auto;
    transition: all 0.5s ease;

    :hover {
      ${UserName} {
        color: ${globalColor.red.liteRed};
      }
    }

    ${InfoBox} {
      p {
        color: ${cyberSecurityColors.cyberSecurityColorGray300};
        font-family: var(--font-poppins), sans-serif;
        font-size: ${rem(14)};
        font-weight: 300;
        line-height: ${rem(20)};
      }
    }

    ${UserName} {
      margin: 0 0 ${rem(16)} 0;
      color: ${globalColor.white};
      font-family: var(--font-poppins), sans-serif;
      font-size: ${rem(20)};
      font-weight: 600;
      line-height: ${rem(26)};
    }

    ${ContactBox} {
      margin: 0;
      row-gap: ${rem(4)};
      a {
        color: ${cyberSecurityColors.cyberSecurityColorLightGray};
        font-family: var(--font-poppins), sans-serif;
        font-size: ${rem(14)};
        font-weight: 600;
        line-height: ${rem(20)};
        text-transform: uppercase;
        column-gap: ${rem(10)};
        transition: all 0.5s ease;

        :hover {
          color: ${globalColor.red.liteRed};

          svg {
            fill: ${globalColor.red.liteRed};
          }
        }

        svg {
          fill: ${globalColor.white};
          transition: all 0.5s ease;
        }

        span {
          text-decoration: none;
        }
      }
    }

    img {
      object-fit: cover;
    }
  }

  ${media_breakpoint_down('xl')} {
    grid-area: auto;
  }
`;

export const AboutUsSidebarAttorneysHeader = styled.div`
  margin-bottom: ${rem(36)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
  }
`;
export const AboutUsSidebarAttorneysHeaderBtns = styled.div`
  display: flex;
  column-gap: ${rem(10)};
`;
export const AboutUsSidebarAttorneysHeaderBtn = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ::after {
    content: '';
    border-left: ${rem(12)} solid transparent;
    border-right: ${rem(12)} solid transparent;
    border-bottom: ${rem(15)} solid ${cyberSecurityColors.cyberSecurityColorLightGray};
    transition: all 0.5s ease;
  }

  &:hover {
    ::after {
      border-bottom-color: ${globalColor.red.liteRed};
    }
  }

  &.down {
    ::after {
      border-top: ${rem(15)} solid ${cyberSecurityColors.cyberSecurityColorLightGray};;
      border-left: ${rem(12)} solid transparent;
      border-right: ${rem(12)} solid transparent;
      border-bottom: none;
      transition: all 0.5s ease;
    }

    &:hover {
      ::after {
        border-top-color: ${globalColor.red.liteRed};
      }
    }
  }
`;

export const AboutUsSidebarAttorneys = styled.div`
  margin-bottom: ${rem(60)};
  display: flex;
  flex-direction: column;

  :last-child {
    margin-bottom: 0;
  }

  ${media_breakpoint_down('xl')} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: ${rem(24)};

    .attorney-card-box {
      padding: ${rem(12)} 0;

      img {
        height: 100%;
      }
    }
  }

  ${media_breakpoint_down('md')} {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;