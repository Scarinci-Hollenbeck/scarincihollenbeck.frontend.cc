import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import {
  globalColor,
  globalShadow,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const SearchForm = styled(Form)`
  width: 100%;

  .form-group {
    margin-bottom: 0;
    position: relative;

    & > svg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: ${globalColor.gray.gray110};
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 101;
    }
  }
`;

export const SearchInput = styled(Form.Control)`
  display: flex;
  padding: 8px 50px 8px 16px;
  border-radius: 4px;
  background-color: ${globalColor.white};
  color: ${globalColor.blue.darkBlue};
  font-family: var(--font-poppins);
  font-size: ${rem(16)};
  line-height: 1.5;
  font-weight: 500;
  border: none;
  text-transform: capitalize;

  &:focus {
    color: ${globalColor.blue.darkBlue};
    border: 0;
    outline: 0;
    box-shadow: none;
  }

  ${media_breakpoint_down('md')} {
    background-color: ${globalColor.gray.gray10};
    font-size: ${rem(14)};
    line-height: 1.42;

    &:focus {
      background-color: ${globalColor.gray.gray10};
    }
  }
`;

export const HitsStyled = styled.div`
  .ais-Hits-list {
    margin-bottom: 0;
    padding: 0 10px 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: 50dvh;
  }
`;

export const ResultsContainer = styled.div`
  padding: 12px 0;
  width: 100%;
  background-color: ${globalColor.blue.darkBlue};
  overflow: hidden;
  box-shadow: ${globalShadow.shadowM};
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  z-index: 99;
  opacity: 1;
  scale: 1;
  transform: translate(0);
  transition: ${globalTransition.default};

  &:not(:has(.results-container)),
  &:empty {
    pointer-events: none;
    opacity: 0;
    transform: translateY(-50%);
    scale: 0.3;
  }

  &:not(:has(.ais-Pagination--noRefinement)) {
    padding-bottom: 0;
  }

  .ais-Pagination {
    padding: 4px 16px;

    &.ais-Pagination--noRefinement {
      display: none;
    }

    .ais-Pagination-list {
      margin: 0;
      display: flex;
      justify-content: space-between;
      column-gap: 8px;

      ${media_breakpoint_down('md')} {
        column-gap: 4px;
      }

      .ais-Pagination-item {
        display: flex;
        justify-content: center;
        transition: ${globalTransition.default};

        .ais-Pagination-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${globalColor.gray.gray500};
          font-size: ${rem(16)};
          line-height: 1.5;
          font-weight: 500;
          transition: ${globalTransition.default};

          ${media_breakpoint_down('md')} {
            width: 28px;
            height: 28px;
            font-size: ${rem(14)};
            line-height: 1.42;
            font-weight: 400;
          }

          &.ais-Pagination-link--selected {
            border-radius: 1px;
            background-color: ${globalColor.blue.blue400};
            color: ${globalColor.white};
            font-weight: 700;
          }
        }

        a.ais-Pagination-link {
          &:not(.ais-Pagination-link--selected) {
            &:hover {
              background-color: ${globalColor.blue.blue6002};

              &::after {
                background-color: ${globalColor.blue.blue6002};
              }
            }
          }
        }
      }
    }

    .ais-Pagination-item--firstPage {
      position: relative;

      .ais-Pagination-link {
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          background: url('/icons/double-search-pagination-arrow-left.svg')
              no-repeat center/cover,
            ${globalColor.blue.darkBlue};
          position: absolute;
          top: 0;
          left: 0;
          transition: ${globalTransition.default};
        }
      }
    }

    .ais-Pagination-item--previousPage {
      align-self: flex-start;
      margin-right: auto;
      position: relative;

      .ais-Pagination-link {
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          background: url('/icons/single-search-pagination-arrow-left.svg')
              no-repeat center/cover,
            ${globalColor.blue.darkBlue};
          position: absolute;
          top: 0;
          left: 0;
          transition: ${globalTransition.default};
        }
      }
    }

    .ais-Pagination-item--nextPage {
      position: relative;
      margin-left: auto;

      .ais-Pagination-link {
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          background: url('/icons/single-search-pagination-arrow-right.svg')
              no-repeat center/cover,
            ${globalColor.blue.darkBlue};
          position: absolute;
          top: 0;
          left: 0;
          transition: ${globalTransition.default};
        }
      }
    }
  }

  .ais-SearchBox-form {
    display: inline-flex;
    flex-direction: row-reverse;
    border-radius: 5px;
  }

  .ais-SearchBox-input {
    border: 0;
  }

  .ais-SearchBox-submit {
    border: 0;
    background-color: #fff;
    border-right: 1px solid #a9a9a9;
  }

  .ais-SearchBox-reset {
    display: none;
  }

  ${media_breakpoint_down('sm')} {
    border-radius: 0;
    width: calc(100% + 24px);
    margin-left: -12px;
  }
`;

export const ResultBox = styled.div``;

export const ResultFilterList = styled.ul`
  margin-bottom: 20px;
  padding: 0 16px;
  color: ${globalColor.white};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  ${media_breakpoint_down('md')} {
    margin-bottom: 16px;
    padding: 0 12px;
  }
`;

export const ResultFilterItem = styled.li``;

export const ResultFilterToggle = styled.button`
  padding: 3px 15px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  border-radius: 4px;
  background-color: ${globalColor.blue.blue6002};
  border: 1px solid transparent;
  transition: ${globalTransition.default};

  &.active {
    border-color: ${globalColor.blue.blue400};
    .search-filter-label {
      color: ${globalColor.blue.blue400};
    }

    .search-filter-count {
      color: ${globalColor.white};
    }
  }

  &:hover {
    border-color: ${globalColor.blue.blue400};
  }

  .search-filter-label {
    margin: 0;
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: ${globalColor.white};
    transition: ${globalTransition.default};

    &:not(.clear)::after {
      content: '';
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1px;
      height: 16px;
      background-color: currentColor;
    }
  }

  .search-filter-count {
    color: ${globalColor.gray.gray500};
    font-size: ${rem(14)};
    transition: ${globalTransition.default};
  }
`;
