import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileContactsContainer = styled.address`
  flex: 1 1 50%;
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.blue.blue6002};
  box-shadow: 0px -7px 16px 0px rgba(0, 0, 0, 0.06),
    -10px 10px 19px 0px rgba(0, 0, 0, 0.06);
  position: relative;

  @media print {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  ${media_breakpoint_down('xl')} {
    padding: 12px;
  }

  .contacts-title {
    margin: 0;
    color: ${globalColor.white};
    font-family: var(--font-lato);
    font-size: ${rem(12)};
    line-height: 1.67;
    font-weight: 400;
    text-transform: uppercase;
  }

  .contacts-list {
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  .contacts-offices {
    display: flex;
    flex-wrap: wrap;
    column-gap: inherit;
  }

  .contacts-item,
  .contacts-link {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${rem(14)};
    color: ${globalColor.white};
    transition: ${globalTransition.default};
  }

  .contacts-item {
    &:has(.contacts-link:hover) {
      svg {
        color: ${globalColor.white};
      }
    }

    &.pdf-hidden {
      @media print {
        display: none;
      }
    }
  }

  .contacts-link {
    &:hover {
      color: ${globalColor.blue.skyBlue};

      svg {
        color: ${globalColor.white};
      }
    }
  }

  svg {
    color: ${globalColor.blue.skyBlue};
    width: 20px;
    height: 20px;
    transition: ${globalTransition.default};
  }
`;
