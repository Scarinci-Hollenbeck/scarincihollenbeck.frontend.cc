import Link from 'next/link';
import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from '../global_styles/Global.styles';
import { UnderlinedLink } from '../common/Typography.style';
import { SelectInput, SelectOption } from '../CustomSelect.style';
import { media_breakpoint_down } from '../mediaBreakpoints.style';

export const SearchButton = styled.button`
  padding: 14px;
  background-color: ${globalColor.blue.skyBlue};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${globalTransition.default};

  @media (hover: hover) {
    &:hover {
      background-color: ${globalColor.blue.blue400};
      color: ${globalColor.white};
    }
  }

  &:active {
    background-color: ${globalColor.blue.blue400};
    color: ${globalColor.white};
  }

  &[disabled] {
    pointer-events: none;
  }

  ${media_breakpoint_down('md')} {
    padding: 10px;
  }
`;

export const LibraryFiltersSection = styled.section`
  margin-top: 40px;
  padding: 20px 0;
  background-color: ${globalColor.blue.blue6002};
  box-shadow: 0px 0px 12px 0px rgba(22, 58, 107, 0.08);

  ${media_breakpoint_down('xxl')} {
    margin-top: 24px;
  }

  ${media_breakpoint_down('md')} {
    margin-top: 16px;
  }
`;

export const LibraryFiltersHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media_breakpoint_down('lg')} {
    gap: 20px;
  }

  ${media_breakpoint_down('md')} {
    gap: 16px;
  }
`;

export const LibraryFiltersNav = styled.ul`
  margin: 0;
  display: flex;
  gap: 28px;
  overflow-x: auto;
  max-width: 100%;

  ${media_breakpoint_down('lg')} {
    padding-bottom: 20px;
  }

  ${media_breakpoint_down('md')} {
    gap: 16px;
    padding-bottom: 16px;
  }
`;

export const LibraryFiltersNavItem = styled.li`
  white-space: nowrap;
  display: flex;
`;

export const LibraryFiltersNavLink = styled(Link)`
  padding: 4px 0;
  color: ${({ $active }) =>
    $active ? globalColor.blue.blue200 : globalColor.white};
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  font-weight: ${({ $active }) => ($active ? 900 : 500)};
  border-bottom: 3px solid;
  border-color: ${({ $active }) =>
    $active ? globalColor.blue.blue200 : 'transparent'};
  transition: ${globalTransition.default};
  pointer-events: ${({ $active }) => ($active ? 'none' : 'all')};

  &:hover {
    color: ${globalColor.white};
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.blue200};
    }
  }

  &:active {
    color: ${globalColor.blue.blue200};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(20)};
  }
`;

export const LibraryFiltersLine = styled.div`
  --filters-gap: 16px;
  display: flex;
  flex-direction: column;
  gap: var(--filters-gap);

  ${UnderlinedLink} {
    color: ${globalColor.white};

    @media (hover: hover) {
      &:hover {
        color: ${globalColor.blue.blue400};
      }
    }

    &:active {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const LibraryFiltersFields = styled.ul`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--filters-gap);
`;

export const LibraryFiltersField = styled.li`
  flex: 1;
  display: flex;
  gap: var(--filters-gap);
  min-width: 200px;

  &:last-child {
    min-width: 280px;
  }

  ${SelectInput} {
    &::placeholder {
      text-transform: capitalize;
    }
  }

  ${SelectOption} {
    text-transform: capitalize;
  }

  ${media_breakpoint_down('xxl')} {
    min-width: 300px;
  }
`;

export const LibraryFiltersInput = styled(SelectInput)`
  padding: 12px;
  cursor: unset;
  pointer-events: all !important;

  ${media_breakpoint_down('md')} {
    padding: 10px 8px;
  }
`;
