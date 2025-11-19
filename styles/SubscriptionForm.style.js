import styled from 'styled-components';
import {
  globalColor,
  rem,
  successMessage,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { ChoseButtons } from './SuscriptionsAccordion.style';

export const SubscriptionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  min-width: 320px;

  .kwes-form,
  .kwes-form-init {
    gap: 32px;

    .form-fields {
      --form-fields-gap: 32px;
    }

    > ${ChoseButtons} {
      margin: 0 12px -16px;
    }

    ${media_breakpoint_down('md')} {
      gap: 28px;

      .form-fields {
        --form-fields-gap: 28px;
      }
    }
  }

  .kw-field-error-message {
    display: none;
  }

  #field-error-category {
    width: 100%;
    position: static;
  }

  .form-field--2 {
    width: 100% !important;
  }

  .form-checkboxes {
    display: flex;
    flex-direction: column;
    gap: inherit;
    width: 100%;
  }

  .kw-alert-success {
    ${successMessage}
    &:after {
      content: 'Thank you for subscribing! You are now part of our newsletter.';
    }
  }

  .form-button {
    margin: 0 !important;
  }

  ${media_breakpoint_down('sm')} {
    .kwes-form,
    .kwes-form-init {
      .form-field {
        width: 100%;
      }
    }
  }
`;

export const SubscriptionFormTitle = styled.p`
  margin: 0 16px;
  font-size: ${rem(20)};
  line-height: 1.6;
  font-weight: 600;
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    margin: 0 12px;
    font-size: ${rem(18)};
    line-height: 1.5;
  }
`;
