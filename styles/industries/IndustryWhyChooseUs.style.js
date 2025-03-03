import styled from 'styled-components';
import { ContainerDefault } from 'styles/Containers.style';
import { ContentContainer } from 'styles/Content.style';
import {
  globalBorderRadius,
  globalColor,
  industrySectionContainer,
  industrySectionPaddingBlock,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const IndustryChooseUsSection = styled.section`
  background-color: ${globalColor.white};
  ${industrySectionPaddingBlock};
`;

export const IndustryChooseUsContainer = styled(ContainerDefault)`
  ${industrySectionContainer};
`;

export const IndustryChooseUsHolder = styled.div`
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('lg')} {
    gap: 24px;
  }

  ${media_breakpoint_down('md')} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const IndustryChooseUsImage = styled.picture`
  width: 525px;
  position: relative;
  border-radius: ${globalBorderRadius.middle};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_down('xxl')} {
    width: 400px;
  }

  ${media_breakpoint_down('xl')} {
    width: 340px;
  }

  ${media_breakpoint_down('md')} {
    height: 185px;
    width: 100%;
  }
`;

export const IndustryChooseUsList = styled.ul`
  --industry-choose-us-cards-gap: 40px;
  flex: 1;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--industry-choose-us-cards-gap);

  ${media_breakpoint_down('xxl')} {
    --industry-choose-us-cards-gap: 32px;
  }
`;

export const IndustryChooseUsItem = styled.li`
  width: calc(50% - var(--industry-choose-us-cards-gap) / 2);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid ${globalColor.gray.gray800};

  ${media_breakpoint_down('xxl')} {
    padding-top: 12px;
  }

  ${media_breakpoint_down('xl')} {
    width: 100%;
  }

  ${media_breakpoint_down('md')} {
    padding-top: 8px;
    gap: 8px;
  }
`;

export const IndustryChooseUsItemDescription = styled(ContentContainer)``;
