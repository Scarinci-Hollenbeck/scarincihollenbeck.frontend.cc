import React from 'react';
import { useInstantSearch, useRefinementList } from 'react-instantsearch';
import {
  ResultFilterItem,
  ResultFilterList,
  ResultFilterToggle,
} from 'styles/GlobalSearch.style';
import empty from 'is-empty';

const SEARCH_FILTERS = [
  'Attorneys',
  'Practices',
  'Industries',
  'Office Locations',
  'Careers',
  'Posts',
];

// Single-select post type filter: a click replaces the current filter (the
// active one stays active), "No filter" clears it. Every click goes back to
// page 1, a click on the active filter too, as in v6.
const MySearchFilters = ({ attribute }) => {
  const { items } = useRefinementList({ attribute });
  const { indexUiState, setIndexUiState } = useInstantSearch();
  const currentRefinement = indexUiState.refinementList?.[attribute];

  const refine = (values) => {
    setIndexUiState(({ page, ...state }) => ({
      ...state,
      refinementList: { ...state.refinementList, [attribute]: values },
    }));
  };

  const filteredItems = items.filter((item) => SEARCH_FILTERS.includes(item.label));

  const sortedItems = filteredItems.sort(
    (a, b) => SEARCH_FILTERS.indexOf(a.label) - SEARCH_FILTERS.indexOf(b.label),
  );

  const handleRefine = (item) => {
    refine([item?.label]);
  };
  return (
    <ResultFilterList>
      {sortedItems.map((item) => (
        <ResultFilterItem key={item.label}>
          <ResultFilterToggle
            onClick={() => handleRefine(item)}
            className={`filter-toggle ${item?.isRefined ? 'active' : ''}`}
          >
            <p className="search-filter-label">{item?.label}</p>
            <span className="search-filter-count">{item?.count || 0}</span>
          </ResultFilterToggle>
        </ResultFilterItem>
      ))}

      {!empty(currentRefinement) && (
        <ResultFilterItem>
          <ResultFilterToggle onClick={() => refine([])}>
            <p className="search-filter-label clear">No filter</p>
          </ResultFilterToggle>
        </ResultFilterItem>
      )}
    </ResultFilterList>
  );
};

export default MySearchFilters;
