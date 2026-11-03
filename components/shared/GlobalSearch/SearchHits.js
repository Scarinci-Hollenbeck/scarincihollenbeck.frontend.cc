import React from 'react';
import { HitsStyled } from 'styles/GlobalSearch.style';
import Hit from './Hit';

// Markup of the react-instantsearch-dom 6 Hits widget.
const SearchHits = ({ hits, setIsOpenSearch, handleClear }) => (
  <HitsStyled className="ais-Hits">
    <ul className="ais-Hits-list">
      {hits.map((hit) => (
        <li className="ais-Hits-item" key={hit.objectID}>
          <Hit
            hit={hit}
            setIsOpenSearch={setIsOpenSearch}
            handleClear={handleClear}
          />
        </li>
      ))}
    </ul>
  </HitsStyled>
);

export default SearchHits;
