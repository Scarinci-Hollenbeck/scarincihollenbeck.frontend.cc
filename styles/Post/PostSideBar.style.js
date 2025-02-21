import Link from 'next/link';
import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalShadow,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const PostSidebarAnchors = styled.ul`
  min-height: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;

  ${media_breakpoint_down('lg')} {
    overflow: unset;
  }
`;

export const PostSidebarAnchor = styled.li`
  border-left: 2px solid ${globalColor.gray.gray10};
  transition: ${globalTransition.default};

  &.active {
    color: ${globalColor.blue.blue500};
    border-color: ${globalColor.blue.blue400};

    a {
      color: currentColor;
      font-weight: 600;
    }
  }
`;

export const PostSidebarAnchorLink = styled(Link)`
  display: inline-flex;
  padding: 4px 0 4px 12px;
  color: ${globalColor.gray.gray700};
  font-size: ${rem(16)};
  line-height: 1.5;

  &:hover {
    color: ${globalColor.gray.gray700};
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.blue400};
    }
  }

  &:active {
    color: ${globalColor.blue.blue400};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const PostSidebarWrapper = styled.div`
  width: 420px;
  transition: ${globalTransition.default};
  display: flex;
  flex-direction: column;

  &:has(${PostSidebarAnchors}:empty) {
    width: 0;

    ${media_breakpoint_down('lg')} {
      display: none;
    }
  }

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }
`;

export const PostSidebarAnchorsWrapper = styled.div`
  max-height: calc(100dvh - 32px - var(--header-height));
  margin-top: ${({ $active }) => ($active ? '16px' : '0')};
  padding: ${({ $active }) => ($active ? '20px' : '0 20px')};
  display: grid;
  grid-template-rows: ${({ $active }) => ($active ? '1fr' : '0fr')};
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  pointer-events: ${({ $active }) => ($active ? 'all' : 'none')};
  position: sticky;
  top: calc(var(--header-height) + 16px);
  left: 0;
  background-color: ${globalColor.white};
  border-radius: ${globalBorderRadius.middle};
  box-shadow: ${globalShadow.shadowM};
  transition: all 0.3s ease-in-out;

  ${media_breakpoint_down('lg')} {
    position: static;
    max-height: 100%;
  }

  ${media_breakpoint_down('md')} {
    padding: ${({ $active }) => ($active ? '16px 12px' : '0 12px')};
  }

  &:has(${PostSidebarAnchors}:empty) {
    padding: 0;
  }
`;

export const PostSidebarAnchorsOpener = styled.button`
  width: 100%;
  padding: 20px;
  display: ${({ $hideOpener }) => ($hideOpener ? 'none' : 'flex')};
  align-items: center;
  gap: 8px;
  background-color: ${globalColor.white};
  box-sizing: ${globalShadow.shadowM};
  border-radius: ${globalBorderRadius.middle};
  font-size: ${rem(16)};
  line-height: 1.5;
  font-weight: 600;
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('lg')} {
    display: flex;
  }

  ${media_breakpoint_down('md')} {
    padding: 16px 12px;
    font-size: ${rem(14)};
  }
`;
