import styled from 'styled-components';
import { StandardLightBlueButton } from 'styles/Buttons.style';
import {
  globalBorderRadius,
  globalColor,
  globalShadow,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileAccordionWrapper = styled.section`
  @media print {
    display: none;
  }
  padding-bottom: 60px;

  ${media_breakpoint_down('md')} {
    padding-bottom: 40px;
  }
`;

export const ProfileAccordionHolder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .accordion {
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: inherit;
    --bs-accordion-btn-icon: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M6 9L12 15L18 9' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    --bs-accordion-btn-active-icon: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M6 9L12 15L18 9' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    --bs-accordion-btn-icon-width: 24px;
    --bs-accordion-inner-border-radius: ${globalBorderRadius.small};
  }

  .accordion-item {
    border-radius: 0;
    border: none;

    .duplicate {
      margin-left: 8px;
      margin-top: auto;
      font-size: ${rem(10)};
      line-height: 10px;
    }
  }

  .accordion-button {
    padding: 16px;
    background-color: ${globalColor.blue.blue6002};
    color: ${globalColor.white};
    font-size: ${rem(20)};
    line-height: 1.6;
    font-weight: 600;
    border-radius: ${globalBorderRadius.small};
    border: none;
    box-shadow: ${globalShadow.shadowM};
    transition: ${globalTransition.default};

    &:not(.collapsed) {
      border-radius: ${globalBorderRadius.small} ${globalBorderRadius.small} 0 0;
    }

    ${media_breakpoint_down('md')} {
      padding: 12px;
      font-size: ${rem(18)};
      line-height: 1.56;
    }
  }

  .accordion-body {
    padding: 12px 16px;
    border-radius: 0 0 ${globalBorderRadius.small} ${globalBorderRadius.small};
    background-color: ${globalColor.white};
    box-shadow: ${globalShadow.shadowM};

    ${media_breakpoint_down('md')} {
      padding: 12px;
    }
  }

  @media print {
    .accordion-collapse {
      display: block !important;
    }
  }

  .disclaimer {
    margin: 0;
    text-align: center;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(14)};
    }
  }

  ${StandardLightBlueButton} {
    margin-bottom: 12px;
    width: max-content;
  }
`;

export const ProfileAccordionBody = styled.div`
  columns: ${({ $isTwoColumns }) => ($isTwoColumns ? 2 : undefined)};
  gap: 40px;

  ${media_breakpoint_down('xl')} {
    columns: unset;
  }

  ul {
    margin: 0 0 12px 0;
    list-style: disc;
    display: grid;
    row-gap: 8px;
    column-gap: ${({ $columnGapUl = 24 }) => `${$columnGapUl}px`};
    grid-template-columns: ${({ $columnsCountUl = 1 }) =>
      `repeat(${$columnsCountUl}, 1fr)`};

    li {
      margin: 0 0 0 20px;
      color: ${globalColor.blue.darkBlue};

      &::marker {
        color: ${globalColor.blue.blue400};
      }

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(14)};
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    ${media_breakpoint_down('lg')} {
      column-gap: 24px;
      grid-template-columns: ${({ $columnsCountUl }) =>
        `${$columnsCountUl > 0 ? `repeat(2, 1fr)` : '1fr'}`};
    }

    ${media_breakpoint_down('md')} {
      grid-template-columns: 1fr;
    }
  }

  p {
    margin: 0 0 12px 0;
    color: ${globalColor.blue.darkBlue};

    &:last-child {
      margin-bottom: 0;
    }

    a {
      transition: ${globalTransition.default};
    }

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  h5 {
    margin: 12px 0 4px 0;
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(16)};
    line-height: 1.5;
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      font-weight: inherit;
    }
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    color: ${globalColor.blue.darkBlue};
    border-color: ${globalColor.blue.darkBlue};

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  .disclaimer {
    margin-top: 16px;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }
`;

export const ProfileClientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .accordion-body {
    ul {
      li {
        text-transform: capitalize;
        a {
          color: inherit;
          font-weight: 500;
          transition: ${globalTransition.default};

          &:hover {
            color: ${globalColor.blue.skyBlue};
          }
        }
      }
    }
  }
`;

export const BlogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const AccordionNewsList = styled.div`
  --news-list-gap: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--news-list-gap);

  ${media_breakpoint_down('xl')} {
    --news-list-gap: 12px;
  }
`;
