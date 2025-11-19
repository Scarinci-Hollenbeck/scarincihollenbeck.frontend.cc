import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const NewsCardBlock = styled.article`
  min-height: 192px;
  width: ${({ $isWide, $isFull }) =>
    $isFull
      ? '100%'
      : $isWide
      ? 'calc((100% - var(--news-list-gap)) / 2)'
      : 'calc((100% - var(--news-list-gap) * 2) / 3)'};
  background-color: ${({ $isWhite }) =>
    $isWhite ? globalColor.white : globalColor.gray.gray10};
  border-radius: 4px;
  overflow: hidden;

  .news-card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    border-radius: inherit;
    transition: ${globalTransition.default};
  }

  a.news-card-wrapper {
    :hover {
      border-color: ${globalColor.blue.skyBlue};
    }
  }

  p {
    margin-bottom: 0;
  }

  .news-card-video {
    border-radius: 4px 4px 0 0;
    height: 208px;
    width: 100%;

    .video-render,
    video,
    lite-youtube {
      border-radius: 4px 4px 0 0;
      max-width: 100%;
      width: 100%;
      height: 100%;
    }

    video {
      object-fit: cover;
    }
  }

  .news-card-content {
    flex: 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  .news-card-title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(20)};
    line-height: 1.6;
    font-weight: 600;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(18)};
      line-height: 1.56;
    }
  }

  .news-card-text {
    margin-top: auto;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${globalColor.blue.darkBlue};
    font-size: inherit;
    font-weight: 400;
    line-height: 1.5;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  .news-card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  ${media_breakpoint_down('xl')} {
    width: ${({ $isFull }) =>
      $isFull ? '100%' : 'calc((100% - var(--news-list-gap)) / 2)'};
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
  }
`;

const footerLetterStyles = `
  color: ${globalColor.gray.gray110};
  font-size: inherit;
  font-weight: 300;
  line-height: 1.5;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const CardFooterBox = styled.div`
  display: flex;
  margin-top: auto;
  column-gap: 12px;

  .news-card-label {
    ${footerLetterStyles};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    > span {
      font-weight: 400;
    }
  }

  .news-card-date {
    ${footerLetterStyles};
    margin-left: auto;
    font-weight: 600;
    flex-shrink: 0;
  }
`;
