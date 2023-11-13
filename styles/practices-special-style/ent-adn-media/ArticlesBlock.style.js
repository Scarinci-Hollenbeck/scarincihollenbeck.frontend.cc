import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { LinkToCategory, TitleButtonBox } from '../ArticlesBlock.style';
import { PaginationBtn } from 'styles/PaginationBtn.style';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';
import { BottomSection, TextNews } from 'styles/FirmNews.style';

export const ArticlesSection = styled.section`
  padding: 140px 0;

  ${TitleButtonBox} {
    h3 {
      color: ${globalColor.black};
      font-family: var(--font-carilo);
      font-size: ${rem(84)};
      font-weight: 400;
      line-height: ${rem(100)};
      font-style: italic;
      text-transform: capitalize;

      @media (max-width: 1850px) {
        font-size: ${rem(64)};
        line-height: ${rem(80)};
      }

      @media (max-width: 1440px) {
        font-size: ${rem(48)};
        line-height: ${rem(72)};
      }

      @media (max-width: 768px) {
        font-size: ${rem(32)};
        line-height: ${rem(48)};
      }

      ${media_breakpoint_down('sm')} {
        margin-bottom: 20px;
      }
    }

    ${LinkToCategory} {
      border: ${rem(2)} solid ${globalColor.black};
      background-color: transparent;
      color: ${globalColor.black};
      font-size: ${rem(18)};
      font-weight: 600;
      line-height: ${rem(27)};
      font-family: var(--font-poppins), sans-serif;

      &:hover {
        background-color: ${globalColor.black};
        color: ${globalColor.white};
      }

      @media (max-width: 1850px) {
        padding: ${rem(12)} ${rem(24)};
        font-size: ${rem(16)};
        line-height: ${rem(24)};
      }

      @media (max-width: 1440px) {
        font-size: ${rem(14)};
        line-height: ${rem(21)};
      }

      @media (max-width: 768px) {
        margin-left: auto;
      }
    }

    @media (max-width: 1850px) {
      margin: 0 0 ${rem(32)} 0;
    }

    @media (max-width: 768px) {
      column-gap: ${rem(15)};
      flex-wrap: wrap;
    }
  }

  ${PaginationBtn} {
    svg {
      color: ${globalColor.black};
    }
  }

  .entertainment-news {
    padding: 0;
    width: 32%;
    box-shadow: none;
    background-color: transparent;

    .link-wrapper {
      img {
        transition: all 0.3s ease;
      }
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

    :hover {
      box-shadow: none;
      .link-wrapper {
        img {
          transform: scale(1.1);
        }
      }
    }

    ${TextNews} {
      h2 {
        font-size: ${rem(24)};
        font-family: var(--font-poppins), sans-serif;
        line-height: ${rem(36)};
        font-weight: 600;
        color: ${globalColor.black};

        @media (max-width: 1850px) {
          font-size: ${rem(20)};
          line-height: ${rem(30)};
        }

        @media (max-width: 1440px) {
          font-size: ${rem(18)};
          line-height: ${rem(27)};
        }

        @media (max-width: 768px) {
          font-size: ${rem(16)};
          line-height: ${rem(24)};
        }
      }
    }
  }

  ${media_breakpoint_down('sm')} {
    padding: 70px 0 0;
  }
`;
