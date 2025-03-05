import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { SelectWrapper } from './CustomSelect.style';
import { SearchInput } from './GlobalSearch.style';
import Link from 'next/link';

export const SelectionWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SelectionList = styled.ul`
  margin: 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SelectionItem = styled.li``;

export const SelectionButton = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 24px;
  color: ${globalColor.white};
  background-color: ${globalColor.blue.blue500};
  border-radius: 4px;
  font-size: inherit;
  line-height: 1.5;
  padding: 4px 16px;

  :hover {
    color: ${globalColor.white};
    background-color: ${globalColor.blue.dirtyBlue};
  }

  :active {
    color: ${globalColor.white} !important;
    background-color: ${globalColor.blue.dirtyBlue};
  }

  :focus {
    color: ${globalColor.white};
    background-color: ${globalColor.blue.dirtyBlue};
  }

  > svg {
    flex-shrink: 0;
  }
`;

export const LetterSelectorContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 4px;

  ${media_breakpoint_down('lg')} {
    max-width: 100%;
  }
`;

export const LetterSelectorBtn = styled.button`
  display: flex;
  align-items: center;
  width: 20px;
  color: ${globalColor.white};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;
  text-decoration: none;

  :disabled {
    color: ${globalColor.gray.gray110};
    background: transparent;
    text-decoration: none;
    cursor: default;
  }
`;

//Styles for new Filters in Header Navbar

export const FiltersHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FiltersSection = styled.section`
  margin: 40px 0;
  padding: 12px 0;
  background-color: ${globalColor.blue.blue6002};
  box-shadow: 0px 0px 12px 0px rgba(22, 58, 107, 0.08);

  ${media_breakpoint_down('lg')} {
    margin: 24px 0;
  }
`;

export const FiltersItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  ${media_breakpoint_down('lg')} {
    row-gap: 24px;
  }
`;

export const FiltersColumns = styled.div`
  display: flex;
  gap: 20px;

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }
`;

export const FiltersLeftColumn = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 12px;
  padding-right: 20px;
  border-right: 1px solid ${globalColor.gray.gray500};

  ${SelectWrapper} {
    width: calc(50% - 8px);

    ${media_breakpoint_down('sm')} {
      width: 100%;
    }
  }

  ${SearchInput} {
    padding: 14px 50px 14px 12px;

    ${media_breakpoint_down('md')} {
      padding: 10px 50px 10px 8px;
    }
  }

  ${media_breakpoint_down('lg')} {
    width: 100%;
    padding-right: 0;
    border-right: 0;
  }
`;

export const FiltersRightColumn = styled.div`
  width: calc(50% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 20px;

  ${media_breakpoint_down('lg')} {
    width: 100%;
    row-gap: 12px;
  }
`;

export const FiltersResults = styled.div`
  min-height: 76px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 16px;
  overflow-y: auto;
  overscroll-behavior: contain;

  ${media_breakpoint_down('lg')} {
    min-height: unset;
    overflow-y: unset;
  }
`;

export const ResultCardIcon = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor.gray.gray500};
  transition: ${globalTransition.default};

  ${media_breakpoint_down('md')} {
    width: 24px;
    height: 24px;
  }
`;

export const ResultCardImage = styled(ResultCardIcon)`
  mask: ${({ image }) => image && `url(${image})`} center/cover no-repeat;
  background-color: currentColor;
`;

export const ResultCardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const ResultCardTitle = styled.h4`
  margin: 0;
  color: ${globalColor.white};
  font-size: ${rem(18)};
  line-height: 1.55;
  font-weight: 500;
  transition: ${globalTransition.default};
  text-wrap: balance;

  .highlight {
    color: ${globalColor.blue.blue400};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const ResultCardSubtitle = styled.div`
  margin: 0;
  color: ${globalColor.gray.gray500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  font-weight: 400;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    margin: 0;
  }
`;

export const ResultCardArrow = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor.white};
  opacity: 0;
  transition: ${globalTransition.default};

  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ResultCard = styled(Link)`
  padding: 12px;
  display: flex;
  align-items: center;
  column-gap: 12px;
  border-radius: 4px;
  background-color: ${globalColor.blue.blue6002};
  box-shadow: 0px -7px 16px 0px rgba(0, 0, 0, 0.06),
    -10px 10px 19px 0px rgba(0, 0, 0, 0.06);

  @media (hover: hover) {
    &:hover {
      > span {
        color: ${globalColor.white};
        opacity: 1;
      }
    }
  }

  &:active {
    > span {
      color: ${globalColor.blue.blue400};
      opacity: 1;
    }

    ${ResultCardTitle} {
      color: ${globalColor.blue.blue400};
    }
  }

  &.active {
    pointer-events: none;

    * {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const FiltersNotFound = styled.div`
  padding: 22px 38px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: ${globalBorderRadius.small};
  border: 2px solid ${globalColor.red.newRed};
  background-color: ${globalColor.red.light};

  ${media_breakpoint_down('md')} {
    padding: 10px 14px;
  }
`;

export const FiltersNotFoundMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${globalColor.gray.gray700};
  font-size: ${rem(20)};
  line-height: 1.6;
  font-weight: 600;

  svg {
    flex-shrink: 0;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(18)};
    line-height: 1.56;
  }
`;

export const FiltersNotFoundButton = styled.button`
  width: fit-content;
  color: ${globalColor.blue.blue400};
  font-weight: 700;
  text-decoration: underline;
  text-transform: uppercase;

  :hover {
    text-decoration: none;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;
