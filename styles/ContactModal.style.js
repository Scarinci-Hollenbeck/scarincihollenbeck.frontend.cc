import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { ChildrenBox, ModalContent } from './ModalWindow.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';

export const ContactModalBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding-left: 1px;
  height: content-box;
`;

export const ContactModalHeader = styled.div``;

export const ContactModalTitle = styled.p`
  margin: 0;
  font-size: ${rem(19.2)};
  line-height: 1.2;
  font-weight: 500;
`;

export const ContactModalWrapper = styled.div`
  .kwes-form,
  .kwes-form-init {
    .form-fields {
      --form-fields-gap: 20px;
    }
  }

  .modal-open {
    max-width: 600px;

    ${media_breakpoint_down('sm')} {
      max-width: 100%;
    }
  }

  &.no-transition {
    .kwes-form,
    .kwes-form-init {
      .form-button {
        transition: none !important;
      }

      .form-checkboxes {
        .form-checkbox {
          transition: none !important;
        }
      }

      .form-control {
        transition: none !important;
      }
    }
  }

  &.blue-modal {
    .modal-open {
      max-width: 720px;
      width: 100%;
      padding: 0;
      border-radius: ${globalBorderRadius.middle};
      background-color: ${globalColor.blue.blue6002};
      transition: all 0.8s, background-color 0s;

      .modal-closer {
        position: absolute;
        top: 20px;
        right: 40px;
        color: ${globalColor.white};

        ${media_breakpoint_down('sm')} {
          right: 16px;
          top: 16px;
        }
      }

      ${ChildrenBox} {
        padding: 0;
        margin: 0;
      }
    }

    .kwes-form,
    .kwes-form-init {
      column-gap: 16px;

      .form-control {
        background-color: transparent;
        border-color: ${globalColor.gray.gray500};
        color: ${globalColor.white};

        &:hover,
        &:focus {
          background-color: ${globalColor.blue.blue550};
        }
      }

      textarea.form-control {
        height: 64px;

        ${media_breakpoint_down('sm')} {
          height: 56px;
        }
      }

      .form-disclaimer {
        margin-bottom: 12px;
        color: ${globalColor.gray.gray300};
      }

      .form-checkboxes {
        order: 2;
        margin: 0 0 0 -40px !important;
        width: calc(50% + 32px);
        position: relative;

        .form-checkbox {
          height: 100%;
          width: 100%;
          padding: 16px 16px 16px 40px;
          display: flex;
          justify-content: center;
          background-color: ${globalColor.blue.blue550};
          border-top: 1px solid transparent;
          transition: ${globalTransition.default};
          cursor: pointer;

          &:hover {
            border-top-color: ${globalColor.blue.skyBlue};
            background-color: ${globalColor.blue.blue6002};
            color: ${globalColor.blue.skyBlue};
          }

          ${media_breakpoint_down('sm')} {
            padding: 16px;
          }
        }

        .form-checkbox__label {
          color: ${globalColor.gray.gray300};
        }

        + .kw-field-error-message {
          width: 100%;
          order: 1;
        }

        &:hover {
          + .form-button {
            &::before {
              content: none;
            }
          }
        }

        ${media_breakpoint_down('sm')} {
          margin: 0 0 0 -16px !important;
          width: calc(50% + 8px);
        }
      }

      .form-button {
        order: 3;
        padding: 16px 40px 16px;
        margin: 0 -40px 0 -16px !important;
        width: calc(50% + 48px);
        background-color: ${globalColor.blue.blue550};
        border-radius: 0;
        border-top: 1px solid transparent;
        transition: ${globalTransition.default};

        &::after {
          content: none;
        }

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 16px;
          width: 1px;
          height: calc(100% - 32px);
          background-color: ${globalColor.gray.gray110};
        }

        &:hover {
          border-top-color: ${globalColor.blue.skyBlue};
          background-color: ${globalColor.blue.blue6002};
          color: ${globalColor.blue.skyBlue};

          &::before {
            content: none;
          }
        }

        ${media_breakpoint_down('sm')} {
          padding: 16px;
          margin: 0 -16px 0 -16px !important;
          width: calc(50% + 24px);
        }
      }
    }

    ${ContactModalBox} {
      flex: 1;
      padding: 16px 40px 0;
      row-gap: 12px;
      overflow: auto;
      border-bottom: 1px solid ${globalColor.blue.blue550};

      ${media_breakpoint_down('sm')} {
        padding: 12px 16px 0;
      }
    }

    ${ContactModalHeader} {
      min-height: 60px;
      padding-right: 44px;
      padding-bottom: 12px;
      flex: 1;
      display: flex;
      align-items: center;
      column-gap: 12px;

      ${media_breakpoint_down('sm')} {
        padding-right: 40px;
      }
    }

    ${ContactModalTitle} {
      color: ${globalColor.white};
      font-size: ${rem(16)};
      line-height: 1.5;
      font-weight: 600;

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(14)};
      }
    }
  }
`;

export const SubscriptionModalWrapper = styled.div`
  .modal-closer {
    position: absolute;
    top: 40px;
    right: 20px;
    z-index: 5;

    ${media_breakpoint_down('md')} {
      --icon-wrapper-size: 32px;
      top: 32px;
      right: 12px;
    }

    ${media_breakpoint_down('sm')} {
      top: 12px;
      right: 8px;
    }
  }

  ${ModalContent} {
    ${media_breakpoint_down('md')} {
      padding: 12px;
    }

    ${media_breakpoint_down('sm')} {
      padding: 8px;
    }
  }
`;
