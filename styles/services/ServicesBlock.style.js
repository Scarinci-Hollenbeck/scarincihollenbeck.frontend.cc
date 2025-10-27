import styled from 'styled-components';
import {
  customListMarker,
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ServicesLinksSections = styled.div`
  flex: 1;
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ededed;

  ${media_breakpoint_down('xl')} {
    border-left: 0;
    padding-left: 0;
    row-gap: 40px;
  }
`;

export const ServicesLinksBlock = styled.section`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  scroll-margin-top: 80px;

  ${media_breakpoint_down('xl')} {
    padding: 0;
  }

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const ServicesLinksList = styled.ul`
  margin: 0;
  columns: 2;
  column-gap: 24px;

  ${media_breakpoint_down('md')} {
    columns: 1;
  }
`;

export const ServicesLinksListItem = styled.li`
  margin-bottom: 4px;
  break-inside: avoid;
  ${customListMarker};

  &:last-of-type {
    margin-bottom: 0;
  }

  > a {
    color: ${globalColor.gray.gray110};
    font-size: ${rem(18)};
    line-height: 1.56;
    font-weight: 500;
    transition: ${globalTransition.default};

    @media (hover: hover) {
      &:hover {
        color: ${globalColor.blue.skyBlue};
      }
    }

    ${media_breakpoint_down('md')} {
      font-size: ${rem(16)};
      line-height: 1.5;
    }
  }
`;
