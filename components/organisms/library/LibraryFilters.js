import Select from 'components/common/Select';
import React, { useMemo } from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  LibraryFiltersSection,
  LibraryFiltersFields,
  LibraryFiltersHolder,
  LibraryFiltersNav,
  LibraryFiltersNavItem,
  LibraryFiltersNavLink,
  LibraryFiltersField,
  LibraryFiltersLine,
  LibraryFiltersInput,
  SearchButton,
} from 'styles/library/LibraryFilters.style';
import { LIBRARY_NAV } from 'utils/constants';
import { IoSearchOutline } from 'react-icons/io5';
import useLibraryFilters from 'hooks/useLibraryFilters';
import empty from 'is-empty';
import Selection from '../attorneys/Selection';

const createSelects = (items) => {
  if (empty(items)) return [];

  return items.reduce((acc, [key, value]) => {
    if (!empty(value)) {
      acc.push({
        key,
        defaultValue: `All ${key}`,
        placeHolder: key,
      });
    }
    return acc;
  }, []);
};

const LibraryFilters = ({
  categories,
  offices,
  authors,
  practices,
  industries,
  years,
}) => {
  const optionsMap = useMemo(
    () => ({
      categories,
      offices,
      authors,
      practices,
      industries,
      years,
    }),
    [categories, offices, authors, practices, industries, years],
  );

  const {
    selectedValues,
    pathname,
    handleChangeSelect,
    handleInputChange,
    handleSearch,
    handleClearAll,
    handleClearSelection,
  } = useLibraryFilters(optionsMap);

  const selects = useMemo(
    () => createSelects(Object.entries(optionsMap)),
    [optionsMap],
  );

  const selectionsArray = Object.entries(selectedValues).map(
    ([key, value]) => ({
      key,
      selected: value?.value,
    }),
  );

  return (
    <LibraryFiltersSection>
      <ContainerDefault>
        <LibraryFiltersHolder>
          <LibraryFiltersNav>
            {LIBRARY_NAV.map((item) => (
              <LibraryFiltersNavItem key={item?.id}>
                <LibraryFiltersNavLink
                  href={item?.href}
                  $active={pathname === item?.href}
                >
                  {item?.title}
                </LibraryFiltersNavLink>
              </LibraryFiltersNavItem>
            ))}
          </LibraryFiltersNav>

          <LibraryFiltersLine>
            <form onSubmit={handleSearch}>
              <LibraryFiltersFields>
                <LibraryFiltersField>
                  <LibraryFiltersInput
                    type="text"
                    placeholder="Keyword"
                    value={selectedValues?.keyword?.value || ''}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                  />
                </LibraryFiltersField>
                {selects.map(({ key, placeHolder, defaultValue }, index) => (
                  <LibraryFiltersField key={key}>
                    <Select
                      options={optionsMap[key]}
                      inputValue={selectedValues[key]?.value}
                      placeHolder={placeHolder}
                      onChange={(item) => handleChangeSelect(
                        item,
                        key,
                        item?.title === defaultValue,
                      )}
                      includeDefault
                      defaultLabel={defaultValue}
                    />
                    {index === selects?.length - 1 && (
                      <SearchButton
                        aria-label="Search"
                        type="submit"
                        disabled={empty(selectedValues)}
                      >
                        <IoSearchOutline size={24} />
                      </SearchButton>
                    )}
                  </LibraryFiltersField>
                ))}
              </LibraryFiltersFields>
            </form>

            <Selection
              selections={selectionsArray}
              clearAll={handleClearAll}
              clearQuery={handleClearSelection}
              keyword={selectedValues?.keyword?.value}
            />
          </LibraryFiltersLine>
        </LibraryFiltersHolder>
      </ContainerDefault>
    </LibraryFiltersSection>
  );
};

export default LibraryFilters;
