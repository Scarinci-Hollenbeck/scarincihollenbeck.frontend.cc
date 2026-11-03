import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch';
import {
  ALGOLIA_PUBLIC_API,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_INDEX,
} from 'utils/constants';
import { ResultsContainer } from 'styles/GlobalSearch.style';
import React from 'react';
import MySearchResults from './MySearchResults';
import MySearchFilters from './MySearchFilters';
import { ConnectedSearchBox } from './MySearchBox';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_PUBLIC_API);

const FUTURE = { preserveSharedStateOnUnmount: true };

export const GlobalSearch = ({
  setIsOpenSearch,
  filterByPostType,
  handleHideSearch,
  inputFocus,
  label,
}) => {
  const filters = filterByPostType
    ? 'post_type_label:Posts'
    : 'NOT post_type_label:Clients AND NOT post_type_label:"Home Page Awards" AND NOT post_type_label:Pages';

  const optionalFilters = [
    'post_type_label:Attorneys<score=6>',
    'post_type_label:Practices<score=5>',
    'post_type_label:Industries<score=4>',
    'post_type_label:Office Locations<score=3>',
    'post_type_label:Careers<score=2>',
    'post_type_label:-Posts',
  ];

  // insights off: no click events and no extra third-party host (CSP).
  return (
    <InstantSearch
      indexName={ALGOLIA_SEARCH_INDEX}
      searchClient={searchClient}
      insights={false}
      future={FUTURE}
    >
      <Configure filters={filters} optionalFilters={optionalFilters} />
      <ConnectedSearchBox
        placeholder="Search"
        setIsOpenSearch={setIsOpenSearch}
        handleHideSearch={handleHideSearch}
        inputFocus={inputFocus}
        label={label}
      />
      <ResultsContainer className="search-result-container">
        {!filterByPostType && <MySearchFilters attribute="post_type_label" />}
        <MySearchResults
          setIsOpenSearch={setIsOpenSearch}
          handleHideSearch={handleHideSearch}
        />
      </ResultsContainer>
    </InstantSearch>
  );
};
