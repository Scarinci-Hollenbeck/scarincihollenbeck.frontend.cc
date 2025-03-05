import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  rem,
} from './global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from './mediaBreakpoints.style';
import { Title32 } from './common/Typography.style';
import { ContainerDefault } from './Containers.style';

export const FaqWrapper = styled.section`
  ${Title32} {
    margin-bottom: 12px;
  }

  .accordion {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    --bs-accordion-btn-icon: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M6 9L12 15L18 9' stroke='%23231E1E' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    --bs-accordion-btn-active-icon: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M6 9L12 15L18 9' stroke='%23231E1E' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    --bs-accordion-btn-icon-width: 24px;

    &-item {
      padding-bottom: 8px;
      background-color: #afdcf5;
      border-radius: ${globalBorderRadius.small};
      border: none;
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: -10px 10px 19px 0px rgba(0, 0, 0, 0.06),
          0px -7px 16px 0px rgba(0, 0, 0, 0.06);
      }

      ${media_breakpoint_exactly_down(1439)} {
        padding-bottom: 4px;
      }

      ${media_breakpoint_down('sm')} {
        padding-bottom: 0;
      }
    }

    &-header {
      margin: 0;
      color: #231e1e;
      font-family: var(--font-poppins);
      font-size: inherit;
      line-height: 1.5;
      font-weight: 600;

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(14)};
        line-height: 20px;
        font-weight: 400;
        color: #0d0d0d;
      }
    }

    &-button {
      font: inherit;
      border: none;
      background-color: transparent;
      box-shadow: none;
      padding: 20px 24px 12px 24px;
      border-radius: 0;
      color: #231e1e;

      &::after {
        align-self: flex-start;
      }

      ${media_breakpoint_exactly_down(1850)} {
        padding: 16px 16px 12px 16px;
      }

      ${media_breakpoint_down('sm')} {
        padding: 12px 8px 12px 8px;
        color: #0d0d0d;
      }
    }

    &-body {
      padding: 0 24px 12px;
      color: ${globalColor.gray.gray80};
      font-size: inherit;
      line-height: 24px;
      font-weight: 400;
      font-family: var(--font-poppins);

      p {
        line-height: 24px;

        &:last-child {
          margin: 0;
        }
      }

      ul {
        &:last-child {
          margin-bottom: 0;
        }
      }

      ${media_breakpoint_exactly_down(1850)} {
        padding: 0 16px 12px;
      }

      ${media_breakpoint_down('sm')} {
        padding: 0 8px 12px;
        font-size: ${rem(14)};
        line-height: 24px;
        font-weight: 400;
      }
    }
  }

  @media print {
    margin-bottom: 0;

    ${Title32} {
      margin-bottom: 20px;
      page-break-before: auto;
    }

    .accordion {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      &-item {
        padding-bottom: 0;
        background-color: ${globalColor.gray.gray1002};
        border-radius: ${globalBorderRadius.middle};
        border: 1px solid ${globalColor.gray.gray300};
        box-shadow: none;
        break-inside: avoid;
        page-break-inside: avoid;

        &:hover {
          box-shadow: none;
        }
      }

      &-header {
        margin: 0;
        color: ${globalColor.blue.blue500};
        font-family: var(--font-lato);
        font-size: ${rem(16)};
        line-height: 1.4;
        font-weight: 400;
        text-transform: uppercase;
      }

      &-button {
        pointer-events: none;
        border: none;
        background-color: transparent;
        box-shadow: none;
        padding: 12px 12px 4px 12px;
        border-radius: 0;
        color: ${globalColor.blue.blue500};
        font-family: var(--font-lato);
        font-size: ${rem(16)};
        line-height: 1.4;
        margin-bottom: 4px;
        font-weight: 400;
        text-transform: uppercase;

        &::after {
          display: none;
        }
      }

      &-body {
        font-size: ${rem(10)};
        line-height: 1.6;
        padding: 0 12px 12px 12px;
        color: ${globalColor.black};

        p {
          &:last-child {
            margin: 0;
          }
          line-height: 1.5;
        }

        ul {
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  &.two-columns {
    .accordion {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(550px, 100%), 1fr));
      gap: 20px;

      ${media_breakpoint_down('md')} {
        gap: 16px;
      }
    }

    .accordion-item {
      height: fit-content;
    }
  }
`;

export const FaqContainer = styled(ContainerDefault)`
  padding-block: 40px;

  ${media_breakpoint_down('md')} {
    padding-block: 24px;
  }
`;
