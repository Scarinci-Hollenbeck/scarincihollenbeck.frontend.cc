import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { Accordion } from 'react-bootstrap';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const CheckboxesList = styled.ul`
  margin: 0;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 16px;

  > .css-1458dhy,
  > span {
    margin: 0 auto;
    grid-column: -1 / 1;
  }
`;

export const ChoseButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const ChoseButton = styled.button`
  padding: 0;
  color: ${globalColor.blue.blue400};
  font-size: ${rem(16)};
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: underline;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover:not([disabled]) {
      text-decoration: none;
    }
  }

  &[disabled] {
    cursor: default;
    color: ${globalColor.gray.gray130};
    background-color: transparent;
    pointer-events: none;
    opacity: 0.65;
  }
`;

export const SubscriptionAccordionCollapse = styled(Accordion)`
  --bs-accordion-bg: ${globalColor.gray.gray10};
  --bs-accordion-border-color: transparent;
  --bs-accordion-border-radius: ${globalBorderRadius.middle};
  --bs-accordion-inner-border-radius: ${globalBorderRadius.middle};
  --bs-accordion-border-width: 0px;
  --bs-accordion-btn-padding-x: 16px;
  --bs-accordion-btn-padding-y: 12px;
  --bs-accordion-btn-color: ${globalColor.blue.darkBlue};
  --bs-accordion-btn-bg: ${globalColor.gray.gray10};
  --bs-accordion-btn-icon-width: 24px;
  --bs-accordion-btn-focus-border-color: transparent;
  --bs-accordion-btn-focus-box-shadow: none;
  --bs-accordion-body-padding-x: 16px;
  --bs-accordion-body-padding-y: 16px;
  --bs-accordion-active-color: ${globalColor.blue.darkBlue};
  --bs-accordion-active-bg: ${globalColor.gray.gray10};

  .accordion-body {
    padding-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .accordion-button {
    font-size: ${rem(18)};

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
    }
  }

  .form-checkbox__label {
    color: ${globalColor.gray.gray700} !important;
    font-size: inherit !important;
  }

  .form-checkbox__icon {
    border-color: #d1d6dc !important;
    background-color: ${globalColor.white};
  }

  ${ChoseButtons} {
    padding-top: 16px;
    border-top: 1px solid ${globalColor.gray.gray300};
  }

  ${media_breakpoint_down('md')} {
    --bs-accordion-btn-icon-width: 20px;
  }
`;
