import {
  entAndMediaColors,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';
import { ContainerContent } from '../commonForSpecial.style';
import { AttorneysContainer } from 'styles/AttorneysListBox.style';
import {
  ContactBox,
  InfoBox,
  LinkBox,
  UserName,
} from 'styles/AttorneyCard.style';
import styled from 'styled-components';

export const AttorneySection = styled.section`
  padding: 120px 0 0 0;

  .attorney-title {
    margin: 0 0 40px 0;
    color: ${globalColor.black};
    font-family: var(--font-carilo);
    font-size: ${rem(64)};
    font-weight: 400;
    line-height: 100px;
  }

  ${ContainerContent} {
    position: relative;
    padding-bottom: ${rem(120)};

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - ${rem(270)});
      height: 1px;
      background-color: ${globalColor.grayExtraLite.grayExtraLite50};
    }

    @media (max-width: 1440px) {
      padding-bottom: ${rem(100)};

      &::after {
        width: calc(100% - ${rem(64)});
      }
    }

    @media (max-width: 768px) {
      padding-bottom: ${rem(80)};
    }
  }

  ${AttorneysContainer} {
    margin: 0;
    padding: 0;
    box-shadow: none;
    column-gap: ${rem(40)};

    .chair-box,
    .attorneys-list-box {
      h3 {
        margin: 0 0 ${rem(32)} 0;
        color: ${globalColor.black};
        font-family: var(--font-poppins), sans-serif;
        font-size: ${rem(36)};
        font-weight: 500;
        line-height: ${rem(54)};
        text-transform: none;
      }
    }

    .chair-box {
      margin: 0;
    }

    .attorneys-list-box {
      > div {
        gap: ${rem(40)};
        margin: 0;
      }
    }

    .attorney-card-box {
      box-shadow: none;
      border: 0;
      padding: 0;

      ${LinkBox} {
        column-gap: ${rem(8)};
        align-items: center;
      }

      ${UserName} {
        margin-bottom: ${rem(4)};
        font-family: var(--font-poppins), sans-serif;
        color: ${globalColor.black};
        font-size: ${rem(18)};
        font-weight: 600;
        line-height: ${rem(27)};
      }

      ${InfoBox} {
        p {
          margin-bottom: ${rem(12)};
          font-family: var(--font-poppins), sans-serif;
          font-size: ${rem(14)};
          font-weight: 400;
          line-height: ${rem(21)};
          color: ${entAndMediaColors.entAndMediaColorMediumGray};
        }
      }

      ${ContactBox} {
        margin: 0;
        row-gap: ${rem(4)};
        a {
          column-gap: ${rem(8)};
          span {
            color: ${globalColor.black};
            font-family: var(--font-poppins), sans-serif;
            font-size: ${rem(14)};
            font-weight: 600;
            line-height: ${rem(21)};
            text-decoration: none;
          }
        }
      }
    }

    @media (max-width: 1850px) {
      .attorneys-list-box {
        > div {
          gap: ${rem(30)};
        }
      }
    }

    @media (max-width: 1440px) {
      flex-direction: column;

      .chair-box,
      .attorneys-list-box {
        h3 {
          margin: 0 0 ${rem(24)} 0;
          font-size: ${rem(32)};
          line-height: ${rem(48)};
        }
      }

      .chair-box {
        margin-bottom: ${rem(28)};
      }

      .attorneys-list-box {
        > div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          column-gap: ${rem(16)};
          row-gap: ${rem(20)};
        }
      }
    }

    @media (max-width: 768px) {
      .attorneys-list-box {
        > div {
          display: grid;
          grid-template-columns: 1fr;

          row-gap: ${rem(16)};
        }
      }
    }
  }

  @media (max-width: 1440px) {
    padding-top: ${rem(100)};
    .attorney-title {
      margin: 0 0 ${rem(24)} 0;
      font-size: ${rem(48)};
      line-height: ${rem(72)};
    }
  }

  @media (max-width: 768px) {
    padding-top: ${rem(80)};

    .attorney-title {
      margin: 0 0 ${rem(20)} 0;
      font-size: ${rem(32)};
      line-height: ${rem(48)};
    }
  }
`;
