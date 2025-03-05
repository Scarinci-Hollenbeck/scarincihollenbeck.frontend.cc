import styled, { keyframes } from 'styled-components';
import {
  globalColor,
  industrySectionContainer,
  industrySectionPaddingBlock,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';
import { CustomPaginationWrapper } from 'styles/Pagination';

const fadeIn = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const IndustryClientsSection = styled.section`
  ${industrySectionPaddingBlock};
`;

export const IndustryClientsHolder = styled.div`
  ${industrySectionContainer};

  .clients-description {
    --content-text-color: ${globalColor.gray.gray110};
    max-width: 800px;
  }
`;

export const IndustryClientsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${CustomPaginationWrapper} {
    .pagination {
      margin: 0;
      gap: 16px;
      --bs-pagination-color: ${globalColor.blue.blue400};
      --bs-pagination-bg: transparent;
      --bs-pagination-border-color: ${globalColor.blue.blue400};
      --bs-pagination-active-color: ${globalColor.white};
      --bs-pagination-active-border-color: transparent;
      --bs-pagination-active-bg: ${globalColor.blue.blue400};
      --bs-pagination-hover-color: ${globalColor.blue.blue500};
      --bs-pagination-hover-bg: transparent;
      --bs-pagination-hover-border-color: ${globalColor.blue.blue400};
      --bs-pagination-disabled-color: ${globalColor.gray.gray130};
      --bs-pagination-disabled-bg: transparent;
      --bs-pagination-disabled-border-color: ${globalColor.gray.gray130};
      --bs-pagination-focus-color: ${globalColor.blue.blue500};
      --bs-pagination-focus-bg: transparent;
      --bs-pagination-focus-box-shadow: none;

      .page-item {
        width: 44px;
        height: 44px;
      }

      .page-link {
        border-radius: 50px;

        span {
          svg {
            color: inherit;
          }
        }
      }

      ${media_breakpoint_down('md')} {
        gap: 8px;

        .page-item {
          width: 28px;
          height: 28px;
        }

        .page-link {
          font-size: ${rem(14)};
        }
      }

      ${media_breakpoint_down('sm')} {
        gap: 4px;
      }
    }
  }
`;

export const IndustryClientsItems = styled.div`
  --clients-items-gap: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--clients-items-gap);

  .loader {
    flex: 1;
  }

  ${media_breakpoint_down('xl')} {
    --clients-items-gap: 24px;
  }
`;

export const IndustryClientsItem = styled.div`
  height: fit-content;
  width: calc((100% - var(--clients-items-gap) * 2) / 3);
  padding: 24px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease;
  background-color: ${globalColor.blue.blue800};
  overflow: hidden;

  &:is(:nth-child(9n + 1), :nth-child(9n + 6), :nth-child(9n + 8)) {
    background-color: ${globalColor.blue.skyBlue};
  }

  &:is(:nth-child(9n + 2), :nth-child(9n + 4), :nth-child(9n + 9)) {
    background-color: ${globalColor.blue.blue1100};
  }

  &:is(:nth-child(9n + 3), :nth-child(9n + 5), :nth-child(9n + 7)) {
    background-color: ${globalColor.blue.blue800};
  }

  &.active {
    ${(props) => {
      return `
        ${ClientOpener} {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          visibility: hidden;
        }
        ${ClientContent} {
          grid-template-rows: 1fr;
          opacity: 1;
          visibility: visible;
        }
        ${ClientOpenerIcon} {
          --accordion-btn-icon: url("data:image/svg+xml;charset=UTF-8,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M19.0313%2013.125H8.96875C8.84844%2013.125%208.75%2013.2234%208.75%2013.3438V14.6563C8.75%2014.7766%208.84844%2014.875%208.96875%2014.875H19.0313C19.1516%2014.875%2019.25%2014.7766%2019.25%2014.6563V13.3438C19.25%2013.2234%2019.1516%2013.125%2019.0313%2013.125Z%22%20fill%3D%22%23314AF5%22/%3E%0A%20%20%3Cpath%20d%3D%22M14%201.75C7.23516%201.75%201.75%207.23516%201.75%2014C1.75%2020.7648%207.23516%2026.25%2014%2026.25C20.7648%2026.25%2026.25%2020.7648%2026.25%2014C26.25%207.23516%2020.7648%201.75%2014%201.75ZM14%2024.1719C8.38359%2024.1719%203.82813%2019.6164%203.82813%2014C3.82813%208.38359%208.38359%203.82813%2014%203.82813C19.6164%203.82813%2024.1719%208.38359%2024.1719%2014C24.1719%2019.6164%2019.6164%2024.1719%2014%2024.1719Z%22%20fill%3D%22%23314AF5%22/%3E%0A%3C/svg%3E%0A");
        }
      `;
    }}
  }

  ${media_breakpoint_down('xxl')} {
    padding: 16px;
  }

  ${media_breakpoint_down('xl')} {
    width: calc((100% - var(--clients-items-gap)) / 2);
  }

  ${media_breakpoint_down('md')} {
    width: 100%;
  }
`;

export const ClientLabel = styled.p`
  margin: 0;
  font-size: ${rem(16)};
  line-height: 1.5;
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;

export const ClientTitle = styled.h3`
  margin: 0;
  font-size: ${rem(24)};
  line-height: 1.5;
  font-weight: 600;
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    font-size: ${rem(20)};
  }
`;

export const ClientOpener = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
  opacity: 1;
  visibility: visible;
  transition: all 0.5s ease;

  ${ClientTitle}, ${ClientLabel} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ClientOpenerWrapper = styled.div`
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;
`;

export const ClientOpenerIcon = styled.span`
  --accordion-btn-icon: url('data:image/svg+xml;charset=UTF-8,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M19.0313%2013.125H14.875V8.96875C14.875%208.84844%2014.7766%208.75%2014.6563%208.75H13.3438C13.2234%208.75%2013.125%208.84844%2013.125%208.96875V13.125H8.96875C8.84844%2013.125%208.75%2013.2234%208.75%2013.3438V14.6563C8.75%2014.7766%208.84844%2014.875%208.96875%2014.875H13.125V19.0313C13.125%2019.1516%2013.2234%2019.25%2013.3438%2019.25H14.6563C14.7766%2019.25%2014.875%2019.1516%2014.875%2019.0313V14.875H19.0313C19.1516%2014.875%2019.25%2014.7766%2019.25%2014.6563V13.3438C19.25%2013.2234%2019.1516%2013.125%2019.0313%2013.125Z%22%20fill%3D%22%23060B2A%22/%3E%0A%20%20%3Cpath%20d%3D%22M14%201.75C7.23516%201.75%201.75%207.23516%201.75%2014C1.75%2020.7648%207.23516%2026.25%2014%2026.25C20.7648%2026.25%2026.25%2020.7648%2026.25%2014C26.25%207.23516%2020.7648%201.75%2014%201.75ZM14%2024.1719C8.38359%2024.1719%203.82813%2019.6164%203.82813%2014C3.82813%208.38359%208.38359%203.82813%2014%203.82813C19.6164%203.82813%2024.1719%208.38359%2024.1719%2014C24.1719%2019.6164%2019.6164%2024.1719%2014%2024.1719Z%22%20fill%3D%22%23060B2A%22/%3E%0A%3C/svg%3E%0A');
  flex-shrink: 0;
  display: block;
  width: 28px;
  height: 28px;
  background-image: var(--accordion-btn-icon);
`;

export const ClientTexts = styled.div`
  flex: 1;
  min-width: 133px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClientContent = styled.div`
  padding: 0;
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
`;

export const ClientContentWrapper = styled(ClientOpenerWrapper)`
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const ClientImage = styled.picture`
  display: flex;

  width: 100%;
  order: 2;

  img {
    margin: 0 auto;
    width: 240px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;
