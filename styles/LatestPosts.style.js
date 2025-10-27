import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import Link from 'next/link';

export const LatestPostsWrapper = styled.section`
  padding: 60px 0;

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const LatestPostsHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const LatestPostsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  > a {
    flex-shrink: 0;
    width: max-content;
  }
`;

export const LatestPostsTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  ${media_breakpoint_down('md')} {
    gap: 16px;
  }
`;

export const LatestPostsTab = styled.button`
  padding: 7px 15px;
  border: 1px solid ${globalColor.gray.gray300};
  border-radius: 4px;
  color: ${globalColor.blue.darkBlue};
  transition: ${globalTransition.default};

  &:hover {
    border-color: ${globalColor.blue.blue400};
    background-color: ${globalColor.gray.gray10};
  }

  &.active {
    border-color: ${globalColor.blue.blue400};
    background-color: ${globalColor.gray.gray10};
    font-weight: 600;
  }

  ${media_breakpoint_down('md')} {
    padding: 7px 11px;
    font-size: ${rem(14)};
  }
`;

export const LatestPostsContent = styled.div``;

export const LatestsPostsCardImage = styled.div`
  max-height: 375px;
  border-radius: ${globalBorderRadius.middle};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LatestsPostsCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const LatestsPostsCardTitle = styled.h3`
  margin: 0 0 auto 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(20)};
  line-height: 1.6;
  font-weight: 600;
  text-transform: uppercase;
  transition: ${globalTransition.default};

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const LatestsPostsCardDescription = styled.div`
  min-height: 96px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  > p {
    margin: 0;
    color: ${globalColor.gray.gray110};
  }

  ${media_breakpoint_down('sm')} {
    min-height: 80px;
    font-size: ${rem(14)};
  }
`;

export const LatestsPostsCardFooter = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > a {
    position: relative;
    z-index: 2;

    &:hover {
      span {
        color: ${globalColor.blue.skyBlue};
      }
    }
  }

  ${media_breakpoint_down('lg')} {
    margin-top: 8px;
  }
`;

export const LatestsPostsCardAuthor = styled(Link)`
  margin: 0;
  color: ${globalColor.gray.gray110};
  font-weight: 300;

  > strong {
    font-weight: 400;
  }

  > span {
    transition: ${globalTransition.default};
  }

  &:hover {
    color: ${globalColor.gray.gray110};
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const LatestsPostsCardDate = styled.time`
  color: ${globalColor.gray.gray700};
  font-weight: 600;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const LatestPostsCardLink = styled(Link)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const LatestsPostsCardWrapper = styled.article`
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-bottom: 1px solid ${globalColor.gray.gray500};
  position: relative;

  &:nth-last-child(-n + 2) {
    border-bottom: 0;
    padding-bottom: 0;
  }

  &:nth-last-child(2) {
    ${media_breakpoint_down('md')} {
      padding-bottom: 12px;
      border-bottom: 1px solid ${globalColor.gray.gray500};
    }
  }

  @media (hover: hover) {
    &:hover {
      ${LatestsPostsCardTitle} {
        color: ${globalColor.blue.blue400};
      }
    }
  }

  &:active {
    ${LatestsPostsCardTitle} {
      color: ${globalColor.blue.blue400};
    }
  }

  &.card-big {
    height: 100%;
    padding-bottom: 0;
    border-bottom: 0;
    grid-row: 1 / 4;

    ${LatestsPostsCardTitle} {
      margin-bottom: 0;
    }

    ${LatestsPostsCardDescription} {
      margin-bottom: auto;
      -webkit-line-clamp: 5;

      ${media_breakpoint_down('xxl')} {
        -webkit-line-clamp: 4;
      }

      ${media_breakpoint_down('lg')} {
        -webkit-line-clamp: unset;
      }

      ${media_breakpoint_down('lg')} {
        -webkit-line-clamp: 4;
      }
    }

    ${media_breakpoint_down('md')} {
      padding-bottom: 24px;
      border-bottom: 1px solid ${globalColor.gray.gray500};
    }
  }

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const LatestPostsCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, max-content);
  column-gap: 32px;
  row-gap: 12px;

  &:has(.card-big) {
    align-items: center;
    column-gap: 40px;
    grid-template-rows: repeat(3, max-content);

    ${LatestsPostsCardWrapper} {
      &:nth-last-child(2) {
        border-bottom: 1px solid ${globalColor.gray.gray500};
        padding-bottom: 12px;
      }

      &:not(.card-big) {
        ${LatestsPostsCardDescription} {
          ${media_breakpoint_down('xxl')} {
            min-height: 48px;
            -webkit-line-clamp: 2;
          }

          ${media_breakpoint_down('sm')} {
            -webkit-line-clamp: 4;
            min-height: 80px;
          }
        }
      }
    }
  }

  .discovery-button {
    margin-top: 12px;
    margin-left: auto;
    width: max-content;
    height: max-content;
  }

  ${media_breakpoint_down('md')} {
    grid-template-columns: 1fr;
  }
`;

export const LatestSimpleCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
  gap: 24px;
`;
