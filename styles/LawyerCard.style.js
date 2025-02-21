import Link from 'next/link';
import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const LawyerCardImage = styled.picture`
  height: 325px;
  width: 100%;
  filter: grayscale(1);
  transition: ${globalTransition.default};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_down('md')} {
    height: 280px;
    filter: unset;
  }

  ${media_breakpoint_down('sm')} {
    height: auto;
  }
`;

export const LawyerCardContent = styled.div`
  --lawyer-card-gap: 12px;
  flex: 1;
  padding: 0 24px 16px;
  display: flex;
  flex-direction: column;
  gap: var(--lawyer-card-gap);

  ${media_breakpoint_down('lg')} {
    padding: 0 12px 12px;
  }
`;

export const LawyerCardChair = styled.div`
  padding: 8px 12px;
  background-color: ${globalColor.blue.blue700};
  color: ${globalColor.white};
  text-transform: uppercase;
  font-size: ${rem(18)};
  font-weight: 500;

  ${media_breakpoint_down('lg')} {
    padding: 2px 12px;
    font-size: ${rem(16)};
  }
`;

export const LawyerCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--lawyer-card-gap);
`;

export const LawyerCardDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LawyerCardName = styled.h3`
  flex: 1;
  margin: 0;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(18)};
  line-height: 1.56;
  font-weight: 500;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const LawyerCardDesignation = styled.p`
  margin: 0;
  font-size: ${rem(14)};
  color: ${globalColor.gray.gray110};
`;

export const LawyerCardContacts = styled.div`
  margin: 6px 0;
  display: flex;
  gap: var(--lawyer-card-gap);
  position: relative;
  z-index: 2;
`;

export const LawyerCardContact = styled(Link)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${globalBorderRadius.extraSmall};
  background-color: ${globalColor.blue.blue200};
  color: ${globalColor.blue.blue500};

  @media (hover: hover) {
    :hover {
      background-color: ${globalColor.blue.blue500};
      color: ${globalColor.white};
    }
  }

  &:active {
    background-color: ${globalColor.blue.blue500};
    color: ${globalColor.white};
  }
`;

export const LawyerCardLocations = styled.ul`
  margin: auto 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-top: var(--lawyer-card-gap);
  border-top: 1px solid ${globalColor.gray.gray10};
  border-radius: 4px;
`;

export const LawyerCardLocation = styled.li`
  font-size: ${rem(14)};
  color: ${globalColor.blue.darkBlue};
`;

export const LawyerCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: ${globalBorderRadius.small};
  background-color: ${globalColor.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: ${globalTransition.default};
  position: relative;

  &:hover {
    box-shadow: 0px -7px 16px 0px rgba(0, 0, 0, 0.06),
      -10px 10px 19px 0px rgba(0, 0, 0, 0.06);

    ${LawyerCardImage} {
      filter: grayscale(0);
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

  &.horizontal-card {
    min-height: 235px;
    flex-direction: row;

    ${LawyerCardImage} {
      width: 45%;
      height: auto;
      position: relative;

      img {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    ${LawyerCardContent} {
      --lawyer-card-gap: 8px;
      padding: 16px 8px 8px 0;

      ${media_breakpoint_down('lg')} {
        padding: 8px 8px 8px 0;
      }
    }

    ${LawyerCardHeader} {
      display: contents;
    }

    ${LawyerCardDescription} {
      row-gap: 4px;
    }

    ${LawyerCardLocations} {
      margin: 0;
    }

    ${LawyerCardContacts} {
      margin: auto 0 0 auto;
      gap: 12px;
      order: 3;
    }

    &:has(${LawyerCardChair}) {
      ${LawyerCardChair} {
        margin: -16px -8px -4px -12px;

        ${media_breakpoint_down('lg')} {
          margin: -8px -8px -6px -12px;
        }
      }
    }

    ${media_breakpoint_down('lg')} {
      min-height: 190px;
    }
  }
`;

export const LawyerCardLifespan = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  padding-top: var(--lawyer-card-gap);
  border-top: 1px solid ${globalColor.gray.gray10};
`;

export const LawyerCardLifespanItem = styled.li`
  font-size: ${rem(14)};
  color: ${globalColor.gray.gray110};
  display: inline-flex;
  gap: 4px;

  > span {
    flex-shrink: 0;
    width: 52px;
    font-weight: 300;
  }
`;
