import { THANKS_MESSAGE } from '../../utils/constants';

export const FormContainer = styled.div`
  ${({ isPositionRelative }) => isPositionRelative && 'position: relative;'}

  .kwes-form {
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;

    .input-group {
      &--0, &--1 {
        height: 100%;
        width: calc(50% - 4px);
      }

      &:last-of-type {
        margin-bottom: 8px;
      }
      
    }

    .form-control {
      border-radius: 0;
      padding: 8px 12px;
      border: none;
      border-bottom: 1px solid rgba(22, 58, 107, 0.37);
      background-color: ${globalColor.white};
      transition: all 0.5s ease-in-out;
      font-family: var(--font-roboto);
      font-size: ${rem(14)};
      line-height: 20px;
      font-weight: 400;
      color: #040C10;
      
      &:hover {
        border-bottom: 1px solid var(--Kate-400, #377EC4);
        background-color: ${globalColor.gray.gray10};
      }

      &:focus {
        border-bottom: 1px solid var(--Kate-400, #377EC4);
        background-color: #FBFBFB;
        box-shadow: none;
      }

      &::placeholder {
        color: #568EDC;
        font-size: ${rem(14)};
        font-weight: 400;
        line-height: 20px;
        font-family: var(--font-roboto);
      }

      &.kw-border-success {
        border-color: #23d160;
      }    
    }

    .kw-alert-error,
    .kw-alert-warning {
      margin-bottom: 20px;
    }

    .kw-alert-success {
      ${successMessage}
      margin: 0;
      background-color: #164587;
      border-radius: 0;
      justify-content: center;
      align-items: flex-start;
      text-align: start;
      color: ${globalColor.white};
      order: 1;
      text-transform: uppercase;
      font-size: ${rem(57)};
      font-family: var(--font-roboto);
      line-height: 64px;
      font-weight: 400;

      &:before {
        margin: 40px 0 16px 0;
        content: 'Your message has been sent successfully';
        background: transparent;
        width: auto;
        height: auto;
        color: ${globalColor.white};
        font-family: var(--font-roboto);
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
        font-family: var(--font-roboto);
        order: 3;
        text-transform: none;
      }
    }

    .form-label {
      display: none;
    }

    textarea.form-control {
      height: 56px;
    }

    p {
      font-size: ${rem(10)};
      line-height: 16px;
      color: ${globalColor.gray.gray80};
      font-weight: 400;
      font-family: var(--font-poppins);
    }

    label {
      display: flex;
      align-items: center;

      .disclaimer-checkbox {
        display: flex;
        justify-content: center;
        width: 23px;
        height: 23px;
        margin-right: 8px;
        border-radius: 0;
        border: 1px solid ${globalColor.grayExtraLite.grayExtraLite100};
        border-radius: 2px;
      }

      .disclaimer-input {
        appearance: none;
        border: none;

        &:checked {
          & + .disclaimer-checkbox {
            background-color: ${globalColor.graySmoke.smoke};
            &::before {
              content: '✔';
            }
          }
        }
      }

      span {
        color: ${globalColor.gray.gray80};
        font-size: ${rem(12)};
        line-height: 20px;
        font-weight: 400;
        font-family: var(--font-poppins);
      }
    }
  }
`;
import { InputGroup, Form } from 'react-bootstrap';
import styled from 'styled-components';

import {
  globalColor,
  rem,
  successMessage,
} from 'styles/global_styles/Global.styles';

export const InputGroupStyled = styled(InputGroup)`
  margin-bottom: 20px;
  .kw-field-error-message {
    width: 100%;
    position: static;
    padding-left: 12px;
  }

  &:has(.kw-field-error-message) {
    .form-control {
      background-color: #FDE8E8;
      border-bottom: 1px solid #BA1212;
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

export const TwoColumnsForm = styled.form`
  .career-form-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 30px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
`;
