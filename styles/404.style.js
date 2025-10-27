import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { TileContactBody, TileContactWrapper } from './ContactUs.style';

export const ErrorWrapper = styled.section`
  margin-bottom: 60px;

  ${media_breakpoint_down('lg')} {
    margin-bottom: 40px;
  }

  .breadcrumb-container {
    margin: 32px 0;
    padding: 0;

    ${media_breakpoint_down('md')} {
      margin: 20px 0;
    }

    > li {
      > a,
      > span {
        font-family: var(--font-poppins);
        font-size: ${rem(14)};
      }

      > a {
        color: ${globalColor.grayExtraLite.grayExtraLite50};
        transition: all 0.3s ease-out;

        &:hover {
          color: ${globalColor.blue.lightBlue};
        }
      }

      > span {
        color: ${globalColor.gray.gray40};
      }
    }
  }
`;

export const ErrorHolder = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
  row-gap: 24px;

  ${media_breakpoint_down('lg')} {
    flex-wrap: wrap;
  }
`;

export const ErrorContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${media_breakpoint_down('lg')} {
    display: contents;
  }
`;

export const ArticleBox = styled.article`
  ${media_breakpoint_down('lg')} {
    order: -2;
    width: calc(50% - 32px);
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
  }

  h1 {
    margin-bottom: 12px;
    font-family: var(--font-poppins);
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(64)};
    line-height: 1.5;
    font-weight: 700;

    ${media_breakpoint_down('lg')} {
      margin-bottom: 8px;
      font-size: ${rem(44)};
      line-height: 1.5;
    }

    ${media_breakpoint_down('md')} {
      font-size: ${rem(36)};
    }
  }

  .error-subtitle {
    margin: 0 0 20px 0;
    font-family: var(--font-poppins);
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(32)};
    line-height: 1.37;
    font-weight: 600;
    text-transform: capitalize;

    ${media_breakpoint_down('lg')} {
      margin-bottom: 12px;
      font-size: ${rem(20)};
      line-height: 1.5;
      font-weight: 700;
    }
  }

  .error-message {
    color: ${globalColor.gray.gray110};
    margin-bottom: 0;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
      line-height: 1.42;
    }
  }
`;

export const TilesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${TileContactWrapper} {
    ${({ isErrorContent }) => {
      if (isErrorContent) {
        return `
          width: max-content;
        `;
      }
    }}
  }

  ${TileContactBody} {
    > p {
      > a {
        ${({ isErrorContent }) => {
          if (isErrorContent) {
            return `
              color: ${globalColor.blue.blue500};
              font-size: ${rem(32)};
              font-weight: 600;
              line-height: 1.37;

              ${media_breakpoint_down('lg')} {
                font-size: ${rem(24)};
                line-height: 2;
                font-weight: 500;
              }

              ${media_breakpoint_down('md')} {
                font-size: ${rem(20)};
                line-height: 1.6;
                font-weight: 500;
              }

              &:hover {
                color: ${globalColor.red.darkRed};
              }
            `;
          }
        }}
      }
    }
  }

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }
`;

export const LinkListBox404 = styled.div`
  display: flex;
  flex-direction: column;

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }

  > p {
    font-family: var(--font-poppins);
    margin: 0 0 8px 0;
    color: ${globalColor.gray.gray110};

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
      line-height: 1.42;
    }
  }

  ul {
    width: max-content;
    margin: 0;
    height: fit-content;
    column-count: 2;
    column-gap: 32px;

    li {
      margin-bottom: 8px;
      break-inside: avoid;
      color: ${globalColor.blue.darkBlue};
      text-transform: capitalize;
      transition: ${globalTransition.default};

      :hover {
        color: ${globalColor.red.darkRed};
      }

      a {
        color: inherit;
        font-weight: 600;
      }
    }
  }
`;

export const ImageBlindLady = styled.div`
  order: 2;
  width: 50%;
  height: 600px;

  ${media_breakpoint_down('lg')} {
    height: 300px;
    order: -1;
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
    order: 3;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
