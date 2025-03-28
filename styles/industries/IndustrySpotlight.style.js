import styled from 'styled-components';
import { Title60 } from 'styles/common/Typography.style';
import {
  globalColor,
  industrySectionPaddingBlock,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SpotlightWrapper = styled.section`
  ${industrySectionPaddingBlock};
  background: linear-gradient(180deg, #fff 0%, #e4e4e5 100%);
`;

export const SpotlightHolder = styled.div`
  --spotlight-gap: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spotlight-gap);

  ${Title60} {
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 1;

    ${media_breakpoint_down('xxl')} {
      max-width: 440px;
    }

    ${media_breakpoint_down('xl')} {
      max-width: 270px;
    }

    ${media_breakpoint_down('md')} {
      max-width: 100%;
    }
  }

  ${media_breakpoint_down('xxl')} {
    --spotlight-gap: 24px;
  }

  ${media_breakpoint_down('xl')} {
    --spotlight-gap: 12px;
  }
`;

export const SpotlightDescription = styled.div`
  flex: 1;
  columns: 2;
  color: ${globalColor.blue.darkBlue};
  gap: var(--spotlight-gap);
  position: relative;
  z-index: 1;

  & :last-child {
    margin-bottom: 0;
  }

  ${media_breakpoint_down('xl')} {
    columns: unset;
  }
`;

export const SpotlightImage = styled.picture`
  max-height: 600px;
  width: 100%;
  display: flex;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
