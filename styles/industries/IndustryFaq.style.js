import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
  industrySectionPaddingBlock,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const FAQSection = styled.section`
  background: linear-gradient(0deg, #fff 0%, #e4e4e5 100%);
  ${industrySectionPaddingBlock};
`;

export const FAQHolder = styled.div`
  --accordion-items-gap: 16px;
  display: flex;
  gap: 40px;

  .accordion {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: var(--accordion-items-gap);
    --bs-accordion-btn-icon: url('data:image/svg+xml;charset=UTF-8,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M19.0313%2013.125H14.875V8.96875C14.875%208.84844%2014.7766%208.75%2014.6563%208.75H13.3438C13.2234%208.75%2013.125%208.84844%2013.125%208.96875V13.125H8.96875C8.84844%2013.125%208.75%2013.2234%208.75%2013.3438V14.6563C8.75%2014.7766%208.84844%2014.875%208.96875%2014.875H13.125V19.0313C13.125%2019.1516%2013.2234%2019.25%2013.3438%2019.25H14.6563C14.7766%2019.25%2014.875%2019.1516%2014.875%2019.0313V14.875H19.0313C19.1516%2014.875%2019.25%2014.7766%2019.25%2014.6563V13.3438C19.25%2013.2234%2019.1516%2013.125%2019.0313%2013.125Z%22%20fill%3D%22%23060B2A%22/%3E%0A%20%20%3Cpath%20d%3D%22M14%201.75C7.23516%201.75%201.75%207.23516%201.75%2014C1.75%2020.7648%207.23516%2026.25%2014%2026.25C20.7648%2026.25%2026.25%2020.7648%2026.25%2014C26.25%207.23516%2020.7648%201.75%2014%201.75ZM14%2024.1719C8.38359%2024.1719%203.82813%2019.6164%203.82813%2014C3.82813%208.38359%208.38359%203.82813%2014%203.82813C19.6164%203.82813%2024.1719%208.38359%2024.1719%2014C24.1719%2019.6164%2019.6164%2024.1719%2014%2024.1719Z%22%20fill%3D%22%23060B2A%22/%3E%0A%3C/svg%3E%0A');
    --bs-accordion-btn-active-icon: url('data:image/svg+xml;charset=UTF-8,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M19.0313%2013.125H8.96875C8.84844%2013.125%208.75%2013.2234%208.75%2013.3438V14.6563C8.75%2014.7766%208.84844%2014.875%208.96875%2014.875H19.0313C19.1516%2014.875%2019.25%2014.7766%2019.25%2014.6563V13.3438C19.25%2013.2234%2019.1516%2013.125%2019.0313%2013.125Z%22%20fill%3D%22%23314AF5%22/%3E%0A%20%20%3Cpath%20d%3D%22M14%201.75C7.23516%201.75%201.75%207.23516%201.75%2014C1.75%2020.7648%207.23516%2026.25%2014%2026.25C20.7648%2026.25%2026.25%2020.7648%2026.25%2014C26.25%207.23516%2020.7648%201.75%2014%201.75ZM14%2024.1719C8.38359%2024.1719%203.82813%2019.6164%203.82813%2014C3.82813%208.38359%208.38359%203.82813%2014%203.82813C19.6164%203.82813%2024.1719%208.38359%2024.1719%2014C24.1719%2019.6164%2019.6164%2024.1719%2014%2024.1719Z%22%20fill%3D%22%23314AF5%22/%3E%0A%3C/svg%3E%0A');
    --bs-accordion-btn-icon-width: 28px;
    --bs-accordion-active-color: ${globalColor.blue.blue700};
    --bs-accordion-btn-color: ${globalColor.blue.darkBlue};
    --bs-accordion-color: ${globalColor.gray.gray700};

    &-item {
      padding-bottom: var(--accordion-items-gap);
      border: none;
      border-bottom: 1px solid ${globalColor.gray.gray800};
      border-radius: 0;
      background-color: transparent;
      transition: ${globalTransition.default};

      &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
      }
    }

    &-header {
      font-size: ${rem(20)};
      font-weight: 600;
      color: ${globalColor.blue.darkBlue};

      ${media_breakpoint_down('md')} {
        font-size: ${rem(18)};
      }
    }

    &-button {
      padding: var(--accordion-items-gap) 0;
      font: inherit;
      border: none;
      background-color: transparent;
      box-shadow: none;
      border-radius: 0;
      transition: padding 0.25s ease-out;

      &:focus-visible {
        color: ${globalColor.blue.blue700};
      }

      &:not(.collapsed) {
        padding-bottom: 16px;
      }
    }

    &-body {
      padding: 0 0 var(--accordion-items-gap) 0;
      font-size: inherit;

      p,
      ul {
        &:last-child {
          margin: 0;
        }
      }
    }
  }

  ${media_breakpoint_down('xxl')} {
    --accordion-items-gap: 14px;
  }

  ${media_breakpoint_down('lg')} {
    gap: 24px;
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    --accordion-items-gap: 8px;
    gap: 16px;
  }
`;

export const FAQText = styled.div`
  width: 525px;

  ${media_breakpoint_down('xxl')} {
    width: 400px;
  }

  ${media_breakpoint_down('xl')} {
    width: 340px;
  }

  ${media_breakpoint_down('lg')} {
    width: 100%;
  }

  > h2 {
    max-width: 400px;

    ${media_breakpoint_down('xl')} {
      max-width: 200px;
    }

    ${media_breakpoint_down('lg')} {
      max-width: 100%;
    }
  }
`;
