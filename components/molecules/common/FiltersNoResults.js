import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import {
  FiltersNotFound,
  FiltersNotFoundButton,
  FiltersNotFoundMessage,
} from 'styles/Filters.style';

const FiltersNoResults = ({
  handleClickButton,
  buttonLabel = 'VIEW ALL',
  message = 'Sorry, no results by this query.',
}) => (
  <FiltersNotFound>
    <FiltersNotFoundMessage>
      <BsExclamationTriangle size={24} />
      <span>{message}</span>
    </FiltersNotFoundMessage>
    <FiltersNotFoundButton onClick={handleClickButton}>
      {buttonLabel}
    </FiltersNotFoundButton>
  </FiltersNotFound>
);

export default FiltersNoResults;
