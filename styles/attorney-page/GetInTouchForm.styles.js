import {
  globalColor,
  globalTransition,
  rem,
  successMessage,
} from 'styles/global_styles/Global.styles';
import { InputGroup, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const FormContainer = styled.div`
  .kwes-form,
  .kwes-form-init {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .form-fields {
      width: 100%;
      --form-fields-gap: 32px;
      display: flex;
      flex-wrap: wrap;
      gap: var(--form-fields-gap);

      ${media_breakpoint_down('md')} {
        --form-fields-gap: 16px;
      }
    }

    .form-field {
      &--0,
      &--1,
      &--2,
      &--3 {
        width: calc((100% - var(--form-fields-gap)) / 2);

        ${media_breakpoint_down('sm')} {
          width: 100%;
        }
      }
    }

    .form-control {
      height: fit-content;
      border-radius: 0;
      padding: 12px 16px;
      border: none;
      border-bottom: 1px solid ${globalColor.gray.gray300};
      background-color: ${globalColor.white};
      transition: ${globalTransition.default};
      font-family: var(--font-poppins);
      font-size: inherit;
      line-height: 1.5;
      font-weight: 400;
      color: ${globalColor.blue.darkBlue};
      text-overflow: ellipsis;

      &:hover {
        border-bottom: 1px solid ${globalColor.blue.blue600};
        background-color: ${globalColor.gray.gray10};
      }

      &:focus {
        border-bottom: 1px solid ${globalColor.blue.blue600};
        background-color: #fbfbfb;
        box-shadow: none;
      }

      &::placeholder {
        color: ${globalColor.blue.blue400};
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        font-family: inherit;
      }

      &.kw-border-success {
        border-color: #23d160 !important;
      }

      ${media_breakpoint_down('xxl')} {
        padding: 10px 16px;
      }

      ${media_breakpoint_down('md')} {
        padding: 8px 12px;
      }
    }

    .kw-alert {
      margin: 0;
    }

    .kw-alert-success {
      ${successMessage};
      margin: 0;
      background-color: ${globalColor.blue.blue500};
      border-radius: 0;
      justify-content: center;
      align-items: flex-start;
      text-align: start;
      color: ${globalColor.white};
      order: 1;
      text-transform: uppercase;
      font-size: ${rem(57)};
      font-family: var(--font-poppins);
      line-height: 64px;
      font-weight: 400;

      &:before {
        margin: 40px 0 16px 0;
        content: 'Your message has been sent successfully';
        background: transparent;
        width: auto;
        height: auto;
        color: ${globalColor.white};
        font-family: var(--font-poppins);
        font-size: ${rem(22)};
        line-height: 28px;
        font-weight: 400;
        order: 2;
        text-transform: none;
      }

      &:after {
        content: 'We’ll be in touch shortly!';
        color: ${globalColor.white};
        font-size: ${rem(28)};
        line-height: 36px;
        font-weight: 400;
        font-family: var(--font-poppins);
        order: 3;
        text-transform: none;
      }
    }

    .form-label {
      display: none;
    }

    textarea.form-control {
      height: 80px;

      ${media_breakpoint_down('xxl')} {
        height: 68px;
      }
    }

    .form-disclaimer {
      width: 100%;
      margin: 0;
      font-size: ${rem(12)};
      color: ${globalColor.gray.gray110};
      font-weight: 400;
      font-family: var(--font-poppins);
    }

    .form-checkboxes__label {
      font-size: ${rem(12)};
    }

    .form-checkbox {
      display: flex;
      align-items: center;

      .form-checkbox__icon {
        display: flex;
        justify-content: center;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        border-radius: 0;
        border: 1px solid ${globalColor.gray.gray300};
        flex-shrink: 0;
      }

      .form-checkbox__input {
        appearance: none;
        border: none;
        display: none;

        &:checked {
          & + .form-checkbox__icon {
            background-color: ${globalColor.blue.dirtyBlue};
            ::before {
              content: '';
              display: inline-block;
              transform: rotate(45deg);
              height: 15px;
              width: 8px;
              border-bottom: 2px solid ${globalColor.white};
              border-right: 2px solid ${globalColor.white};
            }
          }
        }
      }

      .form-checkbox__label {
        color: ${globalColor.gray.gray110};
        font-size: ${rem(14)};
        line-height: 1.5;
        font-weight: 400;
      }
    }

    .form-button {
      margin-top: 20px;

      ${media_breakpoint_down('md')} {
        margin-top: 4px;
      }
    }

    .kw-field-error-message {
      font-size: ${rem(12)};
      align-self: flex-end;
    }

    ${media_breakpoint_down('md')} {
      gap: 8px;
    }
  }
`;

export const InputGroupStyled = styled(InputGroup)`
  .kw-field-error-message {
    width: 100%;
    position: static;
    padding-left: 12px;
  }

  &:has(.kw-field-error-message) {
    .form-control {
      background-color: #fde8e8;
      border-bottom: 1px solid #ba1212;
    }
  }

  .form-control {
    margin-left: 0 !important;
  }

  input[type='file']::file-selector-button {
    display: none;
  }

  input[type='file']::file-selector-button:hover {
    background-color: #0d45a5;
  }
`;

export const FormLabelStyled = styled(Form.Label)`
  position: absolute;
  left: 12px;
  z-index: 5;
  color: ${globalColor.grayExtraLite.grayExtraLite80};
`;
