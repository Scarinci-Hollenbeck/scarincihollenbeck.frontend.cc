import { DisclaimerTextStyles } from 'components/atoms/DisclaimerText';
import styled from 'styled-components';
import { Title60 } from 'styles/common/Typography.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  globalColor,
  industrySectionContainer,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const IndustryPostsSection = styled.section`
  padding: 60px 0;
  background-color: ${globalColor.blue.darkBlue};

  ${DisclaimerTextStyles} {
    color: ${globalColor.white};
  }

  .slider-container {
    &::part(bullet) {
      background-color: ${globalColor.blue.blue550};
    }

    &::part(bullet-active) {
      background-color: ${globalColor.blue.blue1000};
    }
  }

  .custom-prev-button,
  .custom-next-button {
    color: ${globalColor.white};

    &:disabled {
      color: ${globalColor.blue.blue550};
      background-color: transparent;
    }
  }

  ${media_breakpoint_down('xxl')} {
    padding: 40px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 24px 0;
  }
`;

export const IndustryPostsContainer = styled(ContainerDefault)`
  ${industrySectionContainer};
`;

export const IndustryPostsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  > a {
    width: fit-content;
    flex-shrink: 0;
  }
`;

export const IndustryPostsTitle = styled(Title60)`
  color: ${globalColor.white};

  strong {
    color: ${globalColor.blue.blue200};
  }
`;
