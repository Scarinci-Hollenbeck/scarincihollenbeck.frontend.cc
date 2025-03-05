import styled from 'styled-components';
import {
  ButtonLinkCss,
  buttonsHoverActive,
  globalColor,
  rem,
  successMessage,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const CheckBoxesList = styled.ul`
  margin: 0;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: 16px;

  > div {
    grid-column: -1 / 1;
  }
`;

export const FormSubscriptionContainer = styled.div`
  --subscription-container-gap: 16px;
  display: flex;
  flex-direction: column;
  row-gap: var(--subscription-container-gap);
  max-width: 816px;
  min-width: 320px;

  .kwes-form,
  .kwes-form-init {
    gap: 32px;
  }

  .kw-field-error-message {
    display: none;
  }

  #field-error-category {
    width: 100%;
    position: static;
  }

  .form-fields {
    --form-fields-gap: 12px !important;
    row-gap: 20px !important;
  }

  .form-field--2 {
    width: 100% !important;
  }

  .form-checkboxes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    color: ${globalColor.gray.gray120};

    &.kw-color-error {
      .form-checkboxes__label {
        color: #ff3852;
      }
    }
  }

  .form-checkbox__label {
    font-size: inherit !important;
  }

  .btn-choose-box {
    display: flex;
    justify-content: space-between;
  }

  .btn-link {
    padding: 0;
    color: ${globalColor.blue.blue400};
    font-size: inherit;
    text-transform: uppercase;
    font-weight: 700;

    &[disabled] {
      color: ${globalColor.gray.gray130};
    }
  }

  .kw-alert-success {
    ${successMessage}
    &:after {
      content: 'Thank you for subscribing! You are now part of our newsletter.';
    }
  }

  .form-button {
    margin: 0 auto !important;
    max-width: 400px;
  }

  ${media_breakpoint_down('md')} {
    .modal-subscription-logo {
      width: 72px;
      height: 72px;
    }
  }

  ${media_breakpoint_down('sm')} {
    .modal-subscription-logo {
      width: 52px;
      height: 52px;
    }

    .kwes-form,
    .kwes-form-init {
      .form-field {
        width: 100%;
      }
    }
  }
`;

export const FormSubscriptionHeader = styled.div`
  padding-right: 52px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: var(--subscription-container-gap);
  border-bottom: 1px solid #d7e3f4;

  ${media_breakpoint_down('md')} {
    padding-right: 40px;
  }

  ${media_breakpoint_down('sm')} {
    gap: 8px;
  }
`;

export const FormSubscriptionHeaderText = styled.p`
  margin: 0;
  font-size: ${rem(22)};
  font-weight: 400;
  max-width: 410px;

  ${media_breakpoint_down('sm')} {
    max-width: 290px;
    font-size: ${rem(16)};
  }
`;
