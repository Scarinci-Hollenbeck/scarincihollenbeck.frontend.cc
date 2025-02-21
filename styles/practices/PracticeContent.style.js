import styled from 'styled-components';
import { FaqWrapper } from 'styles/Faq.style';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { MapWrapper } from 'styles/LocationCard.style';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';
import { SocialHr, SocialLabel } from 'styles/library/SocialShare.style';

export const PracticeContentSection = styled.section`
  padding: 40px 0;
  background-color: ${globalColor.white};

  ${FaqWrapper} {
    margin-bottom: 0;
  }

  .social-share {
    padding: 0;
    --main-socials-color: ${globalColor.blue.darkBlue};
    --socials-svg-size: 20px;
    display: none;
    margin: 0 0 32px 0;

    ${SocialHr} {
      width: calc(100% + 32px);
      margin-right: -32px;
      order: 3;

      ${media_breakpoint_down('md')} {
        width: calc(100% + 12px);
        margin-right: -12px;
      }
    }

    ${SocialLabel} {
      font-size: ${rem(14)};
    }

    ${media_breakpoint_down('xl')} {
      display: flex;
    }
  }

  ${media_breakpoint_exactly_down(1439)} {
    padding: 32px 0;
  }
`;

export const SplitContentHolder = styled.div`
  display: flex;
  column-gap: 60px;

  ${media_breakpoint_exactly_down(1850)} {
    column-gap: 24px;
  }

  ${media_breakpoint_down('lg')} {
    column-gap: 16px;
  }

  ${media_breakpoint_down('sm')} {
    column-gap: 8px;
  }
`;

export const SplitContentDescription = styled.div`
  flex: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${MapWrapper} {
    height: auto;
  }

  ${media_breakpoint_down('lg')} {
    max-width: calc(100% - 56px);
  }

  ${media_breakpoint_down('sm')} {
    max-width: calc(100% - 40px);
  }
`;

export const SplitContentSidebar = styled.div`
  width: 500px;

  ${media_breakpoint_down('xxl')} {
    width: 420px;
  }

  ${media_breakpoint_down('xl')} {
    width: max-content;
  }
`;
