import { Row, Col } from 'react-bootstrap';
import PracticesSelector from 'components/molecules/attorneys/PracticesSelector';
import FilterSelector from 'components/molecules/attorneys/Selector';
import LetterSelector from 'components/molecules/attorneys/Letters';
import { ContainerFilters, FiltersWrapper } from 'styles/Filters.style';
import AuxiliarySearch from '../../shared/GlobalSearch/AuxiliarySearch';

// it was done by request from the client as a temporary solution. 16 Jun 2023. 38 - 45str
const Filters = ({
  practices,
  locations,
  designation,
  userInput,
  handleChange,
  onSelect,
  onSelectLetter,
  children,
  select,
  headerSize,
}) => (
  <FiltersWrapper headerHeight={`${headerSize?.height}px`}>
    <ContainerFilters>
      <Row>
        <Col sm={12} xl={3}>
          <AuxiliarySearch
            currentRefinement={userInput}
            refine={handleChange}
            placeholder="Search by Attorney name"
          />
        </Col>
        <Col xl={3} sm={12} md={6}>
          <PracticesSelector practices={practices} onSelect={onSelect} />
        </Col>
        <Col xl={3} sm={12} md={6}>
          <FilterSelector
            selectionList={locations}
            onSelect={onSelect}
            title="Filter by location"
            nameItem="location"
          />
        </Col>
        <Col xl={3} sm={12} md={6}>
          <LetterSelector
            onSelectLetter={onSelectLetter}
            title="Filter by letters"
            select={select}
            userInput={userInput}
          />
        </Col>
        {/* <Col xl={3} sm={12} md={6}> */}
        {/*  <FilterSelector */}
        {/*    selectionList={designation} */}
        {/*    onSelect={onSelect} */}
        {/*    title="Filter by title" */}
        {/*    nameItem="title" */}
        {/*  /> */}
        {/* </Col> */}
      </Row>
      <Row>{children}</Row>
    </ContainerFilters>
  </FiltersWrapper>
);

export default Filters;
