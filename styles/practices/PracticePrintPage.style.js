import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { Title32 } from 'styles/common/Typography.style';
import {
  AttorneyCardBox,
  ContactBox,
  InfoBox,
  LinkBox,
  UserName,
} from 'styles/AttorneyCard.style';
import { WhyChooseUsSection } from './WhyChooseUs.style';
import { SubHeaderKeyContactsCards } from 'styles/subheader/SubHeaderKeyContacts.style';
import {
  SubHeaderDescription,
  SubHeaderInteractive,
} from 'styles/subheader/SubHeader.style';

export const PracticePrintPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${WhyChooseUsSection} {
    padding: 0;
  }
`;

export const HeaderWrapperPrintVersion = styled.div`
  padding: 0;
`;

export const SubHeaderPrintVersionContainer = styled.div`
  max-width: 100%;
  display: flex;
  gap: 12px;

  ${SubHeaderKeyContactsCards} {
    gap: 12px;
  }

  ${SubHeaderInteractive} {
    width: 40%;
    flex-shrink: 0;
    flex: unset;
    border-radius: 12px;
    padding: 12px;

    ${AttorneyCardBox} {
      img {
        filter: none;
        width: 120px;
        height: 120px;
      }

      ${LinkBox} {
        > img {
          width: 120px;
          height: 120px;
        }
      }

      ${InfoBox} {
        p {
          font-size: ${rem(12)};
          line-height: 1.4;
        }
      }

      ${UserName} {
        font-size: ${rem(16)};
        line-height: 1.6;
        margin-bottom: 4px;
      }

      ${ContactBox} {
        row-gap: 0px;

        a {
          font-size: ${rem(10)};
          line-height: 1.4;

          span {
            font-size: ${rem(10)};
            line-height: 1.4;
          }
        }

        svg {
          width: 12px;
        }
      }

      .contact-offices {
        @media print {
          display: none;
        }
      }
    }
  }
`;

export const SubHeaderMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  ${Title32} {
    color: ${globalColor.black};
    margin-bottom: 0;
  }

  a {
    word-break: break-word;
    color: ${globalColor.blue.blue500};

    &:hover,
    &:focus {
      color: ${globalColor.blue.blue400};
    }
  }

  ${SubHeaderDescription} {
    flex: 1;
    background-color: ${globalColor.gray.gray10};
    border-radius: 12px;
    padding: 12px;
    font-size: ${rem(14)};
    line-height: 20px;
  }
`;

export const DescriptionSectionPrint = styled.section`
  h3,
  h4 {
    color: ${globalColor.blue.darkBlue};
    font-size: ${rem(16)};
    line-height: 1.6;
    font-weight: 600;
    font-family: var(--font-poppins);
    margin-bottom: 8px;

    strong {
      font-weight: inherit;
    }
  }
`;

export const DescriptionArticlePrint = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  .article-main {
    columns: 2;
    column-gap: 16px;

    h3,
    h4 {
      font-size: ${rem(16)};
      line-height: 1.4;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.4;
    }

    p,
    ul {
      margin-bottom: 8px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .row {
      margin: 0;
      gap: 8px;
    }

    .col-sm-12 {
      flex: 0 0 auto;
      width: calc(50% - 4px);
      padding: 0;

      img {
        width: 100%;
        padding: 0;
      }
    }
  }
`;
