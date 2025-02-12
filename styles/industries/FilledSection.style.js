import styled from 'styled-components';
import { ContentContainer, ContentWrapper } from 'styles/Content.style';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const FilledSectionBox = styled.section`
  padding-block: 80px;
  background-color: ${globalColor.blue.darkBlue};
  text-align: center;

  ${ContentWrapper} {
    margin: 0 auto;
    max-width: 920px;
    row-gap: 16px;

    > h2 {
      color: inherit;
      color: ${globalColor.white};
    }

    ${media_breakpoint_down('md')} {
      row-gap: 12px;
    }
  }

  ${ContentContainer} {
    --content-text-color: ${globalColor.gray.gray1002};
    font-size: ${rem(20)};

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(18)};
    }

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
    }
  }

  + .separator-big {
    margin-top: 60px !important;

    ${media_breakpoint_down('xxl')} {
      margin-top: 40px !important;
    }

    ${media_breakpoint_down('md')} {
      margin-top: 24px !important;
    }
  }

  ${media_breakpoint_down('lg')} {
    padding-block: 40px;
  }
`;
