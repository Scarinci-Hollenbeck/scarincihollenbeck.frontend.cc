import styled from 'styled-components';
import { globalColor, rem } from './global_styles/Global.styles';
import { media_breakpoint_exactly_down } from './mediaBreakpoints.style';

export const AttorneyCardBox = styled.article`
  display: flex;
  border: 0.9px solid ${globalColor.graySmoke.smoke};
  min-width: 450px;
  flex-basis: calc(33.3% - 15px);
  padding: 20px 0 17px 20px;
  box-shadow: 0 0.25rem 0.33rem rgba(0, 0, 0, 0.1);
  position: relative;

  :hover {
    cursor: pointer;
    transition: 0.8s;
    box-shadow: rgb(99 98 98 / 90%) -2px 0px 18px;

    > div {
      h3,
      .attorney-card__name {
        color: ${globalColor.red.darkRed};
      }
    }
  }

  .attorney-card-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  ${media_breakpoint_exactly_down(612)} {
    width: 90vw;
    min-width: 100%;
  }
`;

export const LinkBox = styled.div`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: black;
  gap: 20px;

  > img {
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_exactly_down(612)} {
    gap: 10px;
  }
`;

export const InfoBox = styled.section`
  display: flex;
  flex-direction: column;
  p {
    font-size: ${rem(16)};
    color: ${globalColor.gray.gray80};
  }

  > ul {
    z-index: 2;
  }
`;

export const UserName = styled.h3`
  font-size: ${rem(22.4)};
  line-height: 1.3;
  margin-bottom: 0;

  ${media_breakpoint_exactly_down(612)} {
    font-size: ${rem(17.6)};
  }
`;

export const ContactBox = styled.address`
  display: flex;
  flex-direction: column;
  z-index: 2;

  .contact-offices,
  a {
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
      fill: ${globalColor.gray.gray80};
      width: 20px;
    }

    span {
      font-weight: 600;
      text-decoration: 1px underline;
    }
  }

  .contact-offices {
    svg {
      flex-shrink: 0;
    }

    &__links {
      display: flex;
      flex-wrap: wrap;
      column-gap: 4px;

      > a {
        padding-right: 4px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background-color: ${globalColor.white};
        }

        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
  }
`;
