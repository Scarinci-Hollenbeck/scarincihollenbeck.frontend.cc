import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  industrySectionPaddingBlock,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { OpenersList, VerticalTabsSection } from './VerticalTabs.style';
import { ContainerDefault } from './Containers.style';
import { AwardsWrapper } from './Awards.style';

export const IndustryPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${globalColor.gray.gray300};

  ${VerticalTabsSection}, ${AwardsWrapper} {
    ${industrySectionPaddingBlock};
  }

  ${OpenersList} {
    row-gap: 24px;
  }

  .separator-big {
    --separator-line-color: ${globalColor.gray.gray800} !important;
    margin-block: 0 !important;

    &:first-child {
      margin-top: 60px !important;

      ${media_breakpoint_down('xxl')} {
        margin-top: 40px !important;
      }

      ${media_breakpoint_down('md')} {
        margin-top: 24px !important;
      }
    }
  }

  .margin-scroll {
    scroll-margin-top: 68px;

    ${media_breakpoint_down('md')} {
      scroll-margin-top: 52px;
    }
  }
`;

export const IndustryPageContainer = styled(ContainerDefault)`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${media_breakpoint_down('md')} {
    row-gap: 16px;
  }
`;

export const IndustriesWrapper = styled.section`
  padding: 60px 0;
`;

export const IndustriesHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${media_breakpoint_down('md')} {
    row-gap: 20px;
  }
`;

export const IndustriesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  .separated-title {
    width: calc(33.33% - 12px);

    .title-text {
      max-width: 250px;

      ${media_breakpoint_down('xxl')} {
        max-width: 211px;
      }

      ${media_breakpoint_down('lg')} {
        max-width: 100%;
      }
    }

    ${media_breakpoint_down('lg')} {
      width: 100%;
    }
  }

  > p {
    margin: 0;
    flex: 1;
    color: ${globalColor.blue.darkBlue};

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
    align-items: flex-start;

    br {
      display: none;
    }
  }

  ${media_breakpoint_down('md')} {
    row-gap: 8px;
  }
`;

export const IndustriesCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 24px;

  ${media_breakpoint_down('lg')} {
    column-gap: 24px;
  }
`;

export const IndustriesCardWrapper = styled.article`
  flex: 1 1 calc((100% - 80px) / 3);
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  border-left: 1px solid ${globalColor.gray.gray500};
  transition: ${globalTransition.default};

  &:hover {
    border-color: ${globalColor.blue.blue400};
    background-color: ${globalColor.gray.gray1002};

    .hovered-icon {
      color: ${globalColor.blue.blue400};
    }

    .title {
      color: ${globalColor.blue.blue400};
    }
  }

  .hovered-icon {
    color: ${globalColor.blue.darkBlue};
  }

  ${media_breakpoint_down('lg')} {
    flex-basis: calc((100% - 24px) / 2);
  }

  ${media_breakpoint_down('md')} {
    flex-basis: 100%;
  }

  ${media_breakpoint_down('sm')} {
    padding: 8px;
  }
`;

export const IndustriesCardTitle = styled.h3`
  color: ${globalColor.blue.darkBlue};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  transition: ${globalTransition.default};

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const IndustriesCardText = styled.div`
  margin: 0;
  color: ${globalColor.gray.gray110};
  font-size: ${rem(12)};
  line-height: 1.67;
  font-family: var(--font-lato);
  text-transform: uppercase;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

  p {
    margin: 0;
  }
`;
