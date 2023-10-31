import styled from 'styled-components';
import {
  entAndMediaColors,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';

export const ImageWrapper = styled.div`
  margin-bottom: ${rem(20)};
  width: ${rem(275)};
  height: ${rem(340)};

  @media (max-width: 1850px) {
    width: ${rem(228)};
    height: ${rem(280)};
  }

  @media (max-width: 1440px) {
    margin-bottom: 0;
    width: ${rem(140)};
    min-width: ${rem(140)};
    height: ${rem(151)};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardSpecialAttorney = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    ${ImageWrapper} {
      box-shadow: 0 ${rem(4)} ${rem(33)} 0 rgba(0, 0, 0, 0.33);
    }
  }

  .attorney-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .attorney-name {
    margin-bottom: ${rem(8)};
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(24)};
    font-weight: 600;
    line-height: ${rem(36)};
    color: ${globalColor.black};
    flex: 1;
    display: flex;
    align-items: center;
  }

  .attorney-designation,
  .attorney-address {
    font-family: var(--font-poppins), sans-serif;
    font-size: ${rem(16)};
    font-weight: 400;
    line-height: ${rem(24)};
    color: ${entAndMediaColors.entAndMediaColorMediumGray};
  }

  .attorney-designation {
    margin-bottom: ${rem(4)};
  }

  .attorney-address {
    margin-bottom: ${rem(12)};
  }

  .attorney-contact {
    margin: 0;
    row-gap: ${rem(4)};
    a {
      column-gap: ${rem(8)};
      span {
        font-family: var(--font-poppins), sans-serif;
        font-size: ${rem(14)};
        font-weight: 600;
        line-height: ${rem(21)};
        color: ${globalColor.black};
        text-decoration: none;
      }

      &:hover {
        span {
          color: ${globalColor.red.darkRed};
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 1850px) {
    width: ${rem(228)};
  }

  @media (max-width: 1440px) {
    flex-direction: row;
    align-items: center;
    column-gap: ${rem(8)};
    width: 100%;
    /* width: calc(50% - ${rem(16)}); */

    .attorney-name {
      margin-bottom: ${rem(4)};
      font-size: ${rem(18)};
      line-height: ${rem(27)};
    }

    .attorney-designation,
    .attorney-address {
      font-size: ${rem(14)};
      line-height: ${rem(21)};
    }
  }
`;
