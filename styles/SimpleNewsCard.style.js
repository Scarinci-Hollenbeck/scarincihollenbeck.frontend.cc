import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const NewsCardBlock = styled.article`
  min-height: 160px;
  width: ${({ $isWide, $isFull }) =>
    $isFull
      ? '100%'
      : $isWide
      ? 'calc((100% - var(--news-list-gap)) / 2)'
      : 'calc((100% - var(--news-list-gap) * 2) / 3)'};
  display: flex;
  flex-direction: column;
  background-color: ${({ $isTransparent }) =>
    $isTransparent ? 'transparent' : globalColor.gray.gray10};
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: ${globalTransition.default};

  :hover {
    &:has(.news-card-link) {
      background-color: ${globalColor.white};
      border-color: ${({ $isTransparent }) =>
        $isTransparent ? 'transparent' : globalColor.blue.skyBlue};
    }
  }

  .news-card-link {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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
      border-radius: inherit;
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

    a {
      position: relative;
      z-index: 2;
    }
  }

  .news-card-title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
    color: ${({ $isBlueTitle }) =>
      $isBlueTitle ? globalColor.blue.blue500 : globalColor.blue.darkBlue};
    font-size: ${rem(16)};
    line-height: 1.5;
    font-weight: 600;
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

  .news-card-services {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .news-card-author,
  .news-card-label {
    color: ${globalColor.gray.gray700};
    font-weight: 400;
  }

  .news-card-author {
    &.current {
      pointer-events: none;
    }

    @media (hover: hover) {
      &:hover {
        color: ${globalColor.blue.blue400};
      }
    }

    &:active {
      color: ${globalColor.blue.blue400};
    }
  }

  .news-card-label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    > span {
      font-weight: 400;
    }
  }

  .news-card-date {
    margin-top: auto;
    margin-left: auto;
    flex-shrink: 0;
    color: ${globalColor.gray.gray110};
    font-weight: 300;
  }

  ${media_breakpoint_down('xl')} {
    width: ${({ $isFull }) =>
      $isFull ? '100%' : 'calc((100% - var(--news-list-gap)) / 2)'};
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
  }
`;

export const CardFooterBox = styled.div`
  display: flex;
  margin-top: auto;
  column-gap: 12px;
`;
