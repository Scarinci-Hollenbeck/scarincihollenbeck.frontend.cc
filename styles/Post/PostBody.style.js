import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';
import { PostSidebarAnchors } from './PostSideBar.style';
import {
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { sectionPadding } from 'styles/Article.style';
import Link from 'next/link';

export const PostContentSection = styled.section`
  ${sectionPadding};

  @media print {
    display: none;
  }
`;

export const PostContentHolder = styled.div`
  display: flex;
  gap: 40px;
  transition: ${globalTransition.default};

  &:has(${PostSidebarAnchors}:empty) {
    gap: 0;
  }

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    gap: 32px;
  }
`;

export const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: auto;

  .disclaimer {
    margin: 0;
  }

  .wp-block-heading {
    scroll-margin-top: calc(var(--header-height) + 16px);
  }
`;

export const PostConnections = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:empty {
    display: none;
  }
`;

export const PostConnection = styled.li`
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(16)};
  line-height: 1.5;

  > span {
    font-weight: 300;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const PostConnectionLink = styled(Link)`
  color: ${globalColor.blue.blue500};
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: ${globalColor.blue.blue500};
    text-decoration: none;
  }
`;
