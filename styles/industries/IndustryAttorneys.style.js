import styled from 'styled-components';
import { ContainerDefault } from 'styles/Containers.style';
import {
  globalColor,
  industrySectionContainer,
  industrySectionPaddingBlock,
} from 'styles/global_styles/Global.styles';
import {
  LawyerCardContact,
  LawyerCardDesignation,
} from 'styles/LawyerCard.style';

export const IndustryAttorneysSection = styled(ContainerDefault)`
  ${industrySectionContainer};
  ${industrySectionPaddingBlock};

  ${LawyerCardContact} {
    background-color: ${globalColor.blue.blue800};
    color: ${globalColor.blue.blue700};

    @media (hover: hover) {
      :hover {
        background-color: ${globalColor.blue.blue700};
        color: ${globalColor.white};
      }
    }

    &:active {
      background-color: ${globalColor.blue.blue700};
      color: ${globalColor.white};
    }
  }

  ${LawyerCardDesignation} {
    color: ${globalColor.blue.blue550};
  }
`;
