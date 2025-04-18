import React from 'react';
import {
  FiltersHolder,
  FiltersResults,
  FiltersSection,
} from 'styles/Filters.style';
import empty from 'is-empty';
import { ResultsWrapper } from 'styles/Attornyes.style';
import NonFiltered from 'components/molecules/attorneys/NonFiltered';
import { useSelector } from 'react-redux';
import { ContainerDefault } from 'styles/Containers.style';
import FilterResult from './FilterResult';
import Results from './Results';
import { useGetAttorneysQuery } from '../../../redux/services/project-api';
import { useAttorneysSearch } from '../../../hooks/useAttornySearch';
import Filters from './Filters';

const AttorneyFilters = ({
  practices,
  locations,
  setShowNavContent,
  setIsSidebarOpen,
  isNavbar,
  attorneyArchives,
  seoAttorneys,
}) => {
  const { data: attorneysData } = useGetAttorneysQuery();
  const { userInput, select } = useSelector((state) => state.attorneys);
  const attorneys = attorneysData?.data;
  const attorneysCondition = attorneys || [];
  const { attorneysFiltered } = useAttorneysSearch(
    select,
    userInput,
    attorneysCondition,
  );

  const handleCloseModal = () => {
    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }

    if (setShowNavContent) {
      setShowNavContent(false);
    }
  };

  return (
    <FiltersHolder>
      {isNavbar ? (
        <>
          <Filters
            userInput={userInput}
            practices={practices}
            locations={locations}
            select={select}
            attorneys={attorneys}
            setShowNavContent={setShowNavContent}
            handleCloseModal={handleCloseModal}
          />

          {attorneysFiltered?.length > 0
            && (!empty(select) || !empty(userInput)) && (
              <FiltersResults>
                {attorneysFiltered.map((attorney) => (
                  <FilterResult
                    key={attorney.id}
                    link={attorney?.link}
                    name={attorney?.title}
                    designation={attorney?.designation}
                    userInput={userInput}
                    handleCloseModal={handleCloseModal}
                  />
                ))}
              </FiltersResults>
          )}
        </>
      ) : (
        <>
          <FiltersSection>
            <ContainerDefault>
              <Filters
                userInput={userInput}
                practices={practices}
                locations={locations}
                select={select}
                attorneys={attorneys}
                handleCloseModal={handleCloseModal}
              />
            </ContainerDefault>
          </FiltersSection>

          <ResultsWrapper>
            {attorneysCondition.length > 0 ? (
              <Results
                attorneys={attorneysFiltered}
                attorneysContext={attorneysCondition}
                userInput={userInput}
                select={select}
                attorneyArchives={attorneyArchives}
              />
            ) : (
              attorneysCondition.length <= 0 && (
                <NonFiltered attorneys={seoAttorneys} />
              )
            )}
          </ResultsWrapper>
        </>
      )}
    </FiltersHolder>
  );
};

export default AttorneyFilters;
