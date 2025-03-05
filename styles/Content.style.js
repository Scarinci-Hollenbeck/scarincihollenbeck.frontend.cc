import styled from 'styled-components';
import { globalColor, rem } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${({ $contentGap }) => $contentGap};

  ${media_breakpoint_down('xxl')} {
    row-gap: 8px;
  }
`;

export const ContentContainer = styled.div`
  --content-text-color: ${globalColor.gray.gray700};
  color: var(--content-text-color);
  word-break: break-word;

  p,
  ul,
  ol,
  blockquote {
    margin: 0 0 16px 0;

    &:last-child {
      margin: 0;
    }

    &:has(+ *:empty) {
      margin: 0;
    }

    &:empty {
      display: none;
    }
  }

  p {
    &:has(+ ul),
    &:has(+ ol) {
      margin-bottom: 4px;
    }
  }

  strong,
  b {
    font-weight: 600;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 32px 0 4px;
    color: ${globalColor.blue.darkBlue};
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:has(+ *:empty) {
      margin: 0;
    }
  }

  h2 {
    font-size: ${rem(32)};
    line-height: 1.38;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(20)};
      line-height: 1.4;
    }
  }

  h3 {
    font-size: ${rem(24)};
    line-height: 1.5;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(18)};
      line-height: 1.56;
    }
  }

  h4 {
    font-size: ${rem(20)};
    line-height: 1.6;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(16)};
      line-height: 1.5;
    }
  }

  h5 {
    font-size: ${rem(18)};
    line-height: 1.56;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
      line-height: 1.5;
    }
  }

  h6 {
    font-size: ${rem(16)};
    line-height: 1.5;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
      line-height: 1.5;
    }
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;

    table {
      width: 100%;
      border-color: ${globalColor.blue.darkBlue};

      th,
      td {
        padding: 8px 16px;
        min-width: 150px;
      }
    }
  }

  iframe,
  video {
    margin: 16px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.two-columns {
    columns: 2;
    gap: 40px;

    ${media_breakpoint_down('xxl')} {
      gap: 32px;
    }

    ${media_breakpoint_down('lg')} {
      columns: 1;
    }
  }

  .size-large,
  .size-full {
    display: grid;
  }

  img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }

  video {
    width: 100%;
    height: 100%;
  }

  &.grid-two-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    ${media_breakpoint_down('xxl')} {
      gap: 32px;
    }
  }

  ${media_breakpoint_down('sm')} {
    .alignleft,
    .alignright {
      float: none;
      margin: 0;
      max-width: 100%;

      img {
        margin: 0 auto;
      }
    }
  }
`;
