import React from 'react';
import { useHits, useInstantSearch } from 'react-instantsearch';
import { ResultBox } from 'styles/GlobalSearch.style';
import SearchHits from './SearchHits';
import SearchPagination from './SearchPagination';

const MySearchResults = ({ setIsOpenSearch, handleHideSearch }) => {
  const { results } = useInstantSearch();
  const { items } = useHits();

  const handleClear = () => {
    if (handleHideSearch) {
      handleHideSearch();
    }
  };

  // The pagination widget stays mounted while hidden: mounting it with the
  // first results would send every search twice.
  const showResults = results?.query?.length > 0 && items.length > 0;

  return (
    <>
      {showResults && (
        <ResultBox onClick={handleClear} className="results-container">
          <SearchHits
            hits={items}
            setIsOpenSearch={setIsOpenSearch}
            handleClear={handleClear}
          />
        </ResultBox>
      )}
      <SearchPagination totalPages={10} visible={showResults} />
    </>
  );
};
export default MySearchResults;
