import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SubHeaderIndustrySliderWrapper = styled.div`
  --width-cards-container: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  user-select: none;

  ${media_breakpoint_down('xxl')} {
    --width-cards-container: 690px;
  }

  ${media_breakpoint_down('lg')} {
    margin-top: 48px;
    --width-cards-container: 100%;
    gap: 40px;
  }

  ${media_breakpoint_down('md')} {
    margin-top: 16px;
  }
`;

export const SubHeaderIndustryCards = styled.div`
  margin-left: auto;
  max-width: var(--width-cards-container);
  cursor: grab;
`;

export const SubHeaderIndustrySliderControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SubHeaderIndustrySliderSteps = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: ${rem(16)};
`;

export const SubHeaderIndustrySliderStepsCurrent = styled.span`
  color: ${globalColor.white};
`;

export const SubHeaderIndustrySliderStepsDivider = styled.span`
  width: 60px;
  height: 1px;
  background-color: ${globalColor.gray.gray900};
`;

export const SubHeaderIndustrySliderStepsTotal = styled.span`
  color: ${globalColor.gray.gray900};
`;

export const SubHeaderIndustrySliderNavigation = styled.div`
  margin-right: var(--width-cards-container);
  transform: translateX(100%);
  display: flex;
  gap: 13px;

  ${media_breakpoint_down('lg')} {
    margin-right: 0;
    transform: translate(0);
  }
`;

export const SubHeaderIndustrySliderNavigationButton = styled.button`
  color: ${globalColor.white};
  transition: ${globalTransition.default};

  &[disabled] {
    background-color: transparent;
    color: ${globalColor.gray.gray900};
    pointer-events: none;
  }
`;

export const SubHeaderIndustrySliderNavigationPrev = styled(
  SubHeaderIndustrySliderNavigationButton,
)``;

export const SubHeaderIndustrySliderNavigationNext = styled(
  SubHeaderIndustrySliderNavigationButton,
)``;
