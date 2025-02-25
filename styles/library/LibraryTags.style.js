import Link from 'next/link';
import styled from 'styled-components';
import { UnderlinedLink } from 'styles/common/Typography.style';
import {
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const LibraryTagsSection = styled.section``;

export const LibraryTags = styled.ul`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const LibraryTag = styled.li`
  display: flex;
`;

export const LibraryTagLink = styled(Link)`
  padding: 3px 19px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  border: 1px solid currentColor;
  backdrop-filter: blur(2px);
  color: ${globalColor.blue.blue500};
  position: relative;
  font-size: ${rem(16)};
  z-index: 2;
  transition: ${globalTransition.default};

  &:hover {
    color: ${globalColor.blue.skyBlue};
  }

  &.selected {
    background-color: ${globalColor.blue.blue500};
    border-color: ${globalColor.blue.blue500};
    color: ${globalColor.white};
  }

  svg {
    color: currentColor;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const LibraryTagsCollapseOpener = styled(UnderlinedLink)`
  font-size: ${rem(16)};

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;
