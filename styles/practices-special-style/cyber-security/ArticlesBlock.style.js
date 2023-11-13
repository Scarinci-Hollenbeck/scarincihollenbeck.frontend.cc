import styled from 'styled-components';
import { cyberSecurityColors, globalColor, rem } from 'styles/global_styles/Global.styles';
import { LinkToCategory, TitleButtonBox } from '../ArticlesBlock.style';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';
import { BottomSection, TextNews } from 'styles/FirmNews.style';

export const ArticlesSection = styled.section`
  padding: 140px 0;
  background-color: ${cyberSecurityColors.cyberSecurityColorBlack};

  .bage {
    margin-bottom: 16px;
    width: max-content;
    padding: 5px 20px;
    border-radius: 42px;
    background-color: ${cyberSecurityColors.cyberSecurityColorDark};
    font-family: var(--font-poppins), sans-serif;
    color: ${cyberSecurityColors.cyberSecurityColorGray};
    font-size: ${rem(14)};
    font-weight: 300;
    line-height: 20px;
  }

  ${TitleButtonBox} {
    margin: 0 0 26px 0;

    h3 {
      color: ${cyberSecurityColors.cyberSecurityColorLightGray};
      font-family: var(--font-poppins);
      font-size: ${rem(48)};
      font-weight: 500;
      line-height: 72px;

      ${media_breakpoint_down('lg')} {
        font-size: ${rem(36)};
        line-height: 54px;
      }

      ${media_breakpoint_down('md')} {
        font-size: ${rem(28)};
        line-height: 42px;
      }
    }

    ${LinkToCategory} {
      border: ${rem(2)} solid ${globalColor.black};
      background-color: ${globalColor.white};
      color: ${cyberSecurityColors.cyberSecurityColorDark};
      font-size: ${rem(18)};
      font-weight: 600;
      line-height: 26px;
      font-family: var(--font-poppins), sans-serif;
      transition: all 0.5s ease;

      &:hover {
        background-color: ${globalColor.black};
        border-color: ${globalColor.white};
        color: ${globalColor.white};
      }

      ${media_breakpoint_down('xxl')} {
        padding: ${rem(14)} ${rem(24)};
        font-size: ${rem(16)};
        line-height: ${rem(24)};
      }

      ${media_breakpoint_down('lg')} {
        padding: ${rem(12)} ${rem(24)};
        font-size: ${rem(14)};
        line-height: ${rem(21)};
      }

      ${media_breakpoint_down('md')} {
        margin-left: auto;
      }
    }

    ${media_breakpoint_down('md')} {
      margin: 0 0 26px 0;
      column-gap: 15px;
      flex-wrap: wrap;
    }
  }

  .entertainment-news {
    padding: 24px;
    width: 32%;
    box-shadow: none;
    background-color: transparent;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-image: linear-gradient(to bottom left, white, transparent);
      border-image-slice: 1;
    }

    ${media_breakpoint_down('lg')} {
      h2 {
        font-size: 1rem;
      }

      section {
        flex-direction: column;
        gap: 3px;
      }
    }

    ${media_breakpoint_down('md')} {
      width: 100%;
    }

    ${media_breakpoint_exactly_down(633)} {
      .link-wrapper {
        flex-direction: column;
      }

      .news-card-footer {
        display: flex;
      }
    }

    ${TextNews} {
      h2 {
        font-size: ${rem(20)};
        font-family: var(--font-poppins), sans-serif;
        line-height: 30px;
        font-weight: 500;
        color: ${globalColor.white};

        ${media_breakpoint_down('xxl')} {
          font-size: ${rem(18)};
          line-height: 26px;
        }
      }

      .news-card-footer {
        color: ${globalColor.grayLite.grayLite60};
        font-size: ${rem(14)};
        line-height: 20px;
        font-weight: 300;

        a {
          transition: all 0.3s ease;
          
          :hover {
            color: ${globalColor.red.liteRed};       
          }
        }
      }

      ${BottomSection} {
        span {
          color: ${globalColor.grayLite.grayLite60};
          font-size: ${rem(14)};
          line-height: 20px;
          font-weight: 300;
        }
      }
    }
    
  }

  ${media_breakpoint_down('xxl')} {
    padding: 120px 0;
  }

  ${media_breakpoint_down('xl')} {
    padding: 100px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 80px 0;
  }

  ${media_breakpoint_down('sm')} {
    padding: 70px 0;
  }
`;
