import { Form } from 'react-bootstrap';
import { BsSearch, BsXLg } from 'react-icons/bs';
import { SearchForm, SearchInput } from 'styles/GlobalSearch.style';
import { useEffect, useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch';

export const MySearchBox = (props) => {
  const searchInputRef = useRef(null);
  const handleClear = (e) => {
    props.refine({
      currentTarget: {
        value: '',
      },
    });
    searchInputRef?.current?.focus();

    if (props.handleHideSearch) {
      props.handleHideSearch();
    }
  };

  useEffect(() => {
    if (props.inputFocus) {
      searchInputRef?.current?.focus();
    }
  }, [props.inputFocus]);

  return (
    <SearchForm>
      <Form.Group className="form-group" controlId="siteSearch">
        {props?.handleHideSearch ? (
          <BsXLg role="button" onClick={handleClear} />
        ) : !props.currentRefinement ? (
          <BsSearch />
        ) : (
          <BsXLg role="button" onClick={handleClear} />
        )}
        <SearchInput
          type="text"
          value={props.currentRefinement}
          onChange={props.refine}
          placeholder={props.placeholder}
          ref={searchInputRef}
          autoComplete="off"
          aria-label={props.label || 'Site search'}
          title={props.label || 'Site search'}
        />
      </Form.Group>
    </SearchForm>
  );
};

// The input keeps its own state so typing is not tied to the search round
// trip. refine() also resets the page to 1 (v6 kept the old page: a new query
// typed on page 3 opened on page 3).
export const ConnectedSearchBox = (props) => {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  const handleRefine = (event) => {
    setInputValue(event.currentTarget.value);
    refine(event.currentTarget.value);
  };

  return (
    <MySearchBox
      {...props}
      currentRefinement={inputValue}
      refine={handleRefine}
    />
  );
};
