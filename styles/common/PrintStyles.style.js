import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { Title32, Title20 } from './Typography.style';
import { PostContent } from 'styles/Post/PostBody.style';

export const PrintContainer = styled.div`
  display: none;
  -webkit-print-color-adjust: exact; /* For Chrome */
  color-adjust: exact; /* For Firefox */

  @media print {
    display: block;
    height: auto;

    @page {
      size: A4 !important;
      margin: 10mm;
    }

    * {
      font-size: ${rem(10)};
      line-height: 1.6;
    }

    ${Title32} {
      font-size: ${rem(20)};
      line-height: 1.4;
      margin-bottom: 10px;
    }

    ${Title20} {
      font-size: ${rem(16)};
      line-height: 1.4;
      margin-bottom: 8px;
    }

    ${PostContent} {
      padding-block: 20px;
      gap: 12px;
    }

    .post-print-content {
      p,
      ul,
      ol,
      blockquote {
        margin: 0 0 8px 0;

        &:last-child {
          margin: 0;
        }

        &:has(+ *:empty) {
          margin: 0;
        }

        &:empty {
          display: none;
        }
      }

      p {
        &:has(+ ul),
        &:has(+ ol) {
          margin-bottom: 2px;
        }
      }

      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 10px 0 2px;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:has(+ *:empty) {
          margin: 0;
        }
      }

      h2 {
        font-size: ${rem(20)};
        line-height: 1.4;
      }

      h3 {
        font-size: ${rem(18)};
        line-height: 1.56;
      }

      h4 {
        font-size: ${rem(16)};
        line-height: 1.5;
      }

      h5 {
        font-size: ${rem(14)};
        line-height: 1.5;
      }

      h6 {
        font-size: ${rem(14)};
        line-height: 1.5;
      }

      .table-wrapper {
        overflow: unset;
      }
    }
  }
`;

export const HeaderPrintVersionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid #cbcbcb;
  margin: 0 1px 16px 1px;

  .contacts-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contacts-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${globalColor.blue.darkBlue};
    font-weight: 500;

    &:hover,
    &:focus {
      color: ${globalColor.blue.blue500};
    }

    svg {
      width: 16px;
      height: 16px;
      fill: ${globalColor.blue.blue500};
    }
  }

  .locations-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  }

  .locations-list {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0 8px;

    > :nth-child(1) {
      :before {
        display: none;
      }
    }

    .locations-item {
      color: ${globalColor.blue.darkBlue};
      display: flex;
      align-items: center;
      gap: 8px;

      &:before {
        content: '•';
        color: ${globalColor.blue.darkBlue};
      }
    }
  }

  .locations-item {
    color: ${globalColor.blue.blue500};
  }
`;

export const FooterPrintVersionContainer = styled.div`
  display: none;

  @media print {
    padding: 12px;
    display: flex !important;
    justify-content: space-between;
    gap: 12px;
    background-color: ${globalColor.blue.blue6002};
    color: ${globalColor.white};
    border-radius: 8px;
    break-inside: avoid;
    page-break-inside: avoid;

    .advertising-block {
      width: calc(50% - 6px);
    }

    .advertising-title-print {
      margin-bottom: 4px;
    }

    .advertising-text-print {
      font-size: ${rem(8)};
      margin-bottom: 24px;
      width: 65%;
    }
  }
`;

export const ContactsWrapperPrintVersion = styled.div`
  width: calc(50% - 6px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

export const ContactsPrintVersion = styled.div`
  .location-print-list {
    display: flex;
    justify-content: flex-end;
    gap: 0 8px;

    > :nth-child(1),
    > :nth-child(3) {
      :before {
        display: none;
      }
    }

    &:nth-of-type(1) {
      flex-wrap: wrap;
    }

    &:nth-of-type(2) {
      flex-direction: column;
      align-items: flex-end;
      font-weight: 700;
      margin-top: 8px;

      .location-print-item {
        &:before {
          display: none;
        }
      }
    }
  }

  .location-print-item {
    color: ${globalColor.white};
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;

    &:before {
      content: '•';
      color: ${globalColor.white};
    }
  }
`;

export const QRCodesBoxForPDF = styled.div`
  display: none;

  @media print {
    display: flex;
    gap: 24px;
  }
`;
