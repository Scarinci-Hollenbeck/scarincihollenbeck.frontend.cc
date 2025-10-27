import styled from 'styled-components';
import {
  customListMarker,
  globalBorderRadius,
  globalColor,
  rem,
} from '../global_styles/Global.styles';
import { Title32, Title20 } from 'styles/common/Typography.style';
import { ContentContainer } from 'styles/Content.style';

export const BioPrintPageContainer = styled.div`
  @media print {
    display: flex !important;
    flex-direction: column;
    padding-top: 10px;
    gap: 20px;

    .wrapper-pdf {
      display: flex;
      gap: 20px;
    }

    .profile-title {
      padding-top: 3px;

      ${Title32} {
        margin: 3px 0 0 0;
      }

      span {
        font-size: ${rem(16)};
      }
    }

    .profile-services-wrapper {
      box-shadow: none;
      background-color: ${globalColor.gray.gray10};
    }

    .bio-list-info-boxes {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      ul {
        row-gap: 4px;
      }
    }

    .address-box {
      flex: 1 1 calc((100% - 10px) / 2);
      box-shadow: none;

      * {
        font-size: ${rem(10)};
      }

      svg {
        width: 12px;
        height: 12px;
      }
    }

    .item-info-box {
      flex: 1 1 calc((100% - 10px) / 2);
      background-color: ${globalColor.gray.gray10};
      box-shadow: none;
      row-gap: 4px;

      div {
        row-gap: 4px;
      }

      li {
        font-size: ${rem(10)};
      }
    }
  }

  .print-pdf-clients {
    column-count: 3;
    column-gap: 20px;

    a {
      color: ${globalColor.blue.ultramarine};
    }
  }

  ${Title20} {
    margin-bottom: 8px;
  }
`;

export const InfoPrintBox = styled.div`
  column-count: 2;
  column-gap: 20px;

  p,
  ul {
    margin-bottom: 8px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BioPrintPageImage = styled.div`
  margin-top: 6px;
  min-height: auto;
  width: 188px;
  height: 186px;
  border-radius: ${globalBorderRadius.small};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

export const BioPrintPageHeaderRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const BioPrintPageContent = styled(ContentContainer)`
  ul {
    display: grid;
    row-gap: 8px;

    li {
      ${customListMarker};
      color: ${globalColor.blue.darkBlue};

      &::marker {
        color: ${globalColor.blue.blue400};
      }
    }
  }
`;
