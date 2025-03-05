import AuxiliarySearch from 'components/shared/GlobalSearch/AuxiliarySearch';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  FiltersColumns,
  FiltersItems,
  FiltersLeftColumn,
  FiltersRightColumn,
} from 'styles/Filters.style';
import CustomSelect from 'components/common/Select';
import LetterSelector from 'components/molecules/attorneys/Letters';
import { UnderlinedLink } from 'styles/common/Typography.style';
import {
  clearAll,
  clearQuery,
  handleChange,
  onSelect,
  onSelectLetter,
} from '../../../redux/slices/attorneys.slice';
import Selection from './Selection';

const Filters = ({
  userInput,
  practices,
  locations,
  select,
  attorneys,
  setShowNavContent,
  handleCloseModal,
}) => {
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  const handleHideAttorneysNavbar = () => {
    if (
      pathname === '/attorneys'
      && setShowNavContent
      && window
      && window.innerWidth > 992
    ) {
      setShowNavContent(false);
    }
  };

  const handleChangeDispatch = (e) => {
    const { value } = e.currentTarget;
    dispatch(handleChange({ value }));
  };

  const handleChangePracticesSelect = (value) => {
    dispatch(onSelect({ target: { name: 'practices' }, input: value }));
    handleHideAttorneysNavbar();
  };

  const handleChangeLocationsSelect = (value) => {
    dispatch(onSelect({ target: { name: 'location' }, input: value }));
    handleHideAttorneysNavbar();
  };

  const handleSelectLetter = (letter) => {
    dispatch(onSelectLetter(letter));
    handleHideAttorneysNavbar();
  };

  const handleClearAll = () => {
    dispatch(clearAll());
    handleHideAttorneysNavbar();
  };

  const handleClearQuery = (key) => {
    dispatch(clearQuery(key));
    handleHideAttorneysNavbar();
  };

  return (
    <FiltersItems>
      <FiltersColumns>
        <FiltersLeftColumn>
          <AuxiliarySearch
            currentRefinement={userInput}
            refine={handleChangeDispatch}
            placeholder="Search by Attorney name"
          />

          <CustomSelect
            options={practices}
            inputValue={select.find((a) => a.key === 'practices')?.selected}
            placeHolder="Filter by Practice"
            onChange={({ title }) => handleChangePracticesSelect(title)}
          />

          <CustomSelect
            options={locations}
            inputValue={select.find((a) => a.key === 'location')?.selected}
            placeHolder="Filter by Location"
            onChange={({ title }) => handleChangeLocationsSelect(title)}
          />
        </FiltersLeftColumn>

        <FiltersRightColumn>
          <LetterSelector
            onSelectLetter={handleSelectLetter}
            title="Filter by letters"
            select={select}
            userInput={userInput}
            attorneys={attorneys}
          />

          {pathname !== '/attorneys' && (
            <UnderlinedLink
              href="/attorneys"
              onClick={handleCloseModal}
              $isWhite
            >
              View all
            </UnderlinedLink>
          )}
        </FiltersRightColumn>
      </FiltersColumns>

      {(userInput.length > 0 || select.length > 0) && (
        <Selection
          keyword={userInput}
          selections={select}
          clearQuery={handleClearQuery}
          clearAll={handleClearAll}
        />
      )}
    </FiltersItems>
  );
};

export default Filters;
