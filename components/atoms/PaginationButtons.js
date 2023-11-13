import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  PaginationBtn,
  PaginationContainer,
} from '../../styles/PaginationBtn.style';

const PaginationButtons = ({
  handleNextPagination,
  handlePrevPagination,
  countOfArticles,
  disablePrevBtn,
  disabledNextBtn,
  justArrow,
}) => (
  <PaginationContainer>
    <PaginationBtn
      variant="link"
      disabled={disablePrevBtn}
      className="text-dark"
      onClick={() => handlePrevPagination(countOfArticles)}
    >
      {justArrow ? (
        <BsArrowLeft />
      ) : (
        <strong className="arrows-bold">
          <GrPrevious />
          Previous
        </strong>
      )}
    </PaginationBtn>
    <PaginationBtn
      variant="link"
      className="text-dark"
      disabled={disabledNextBtn}
      onClick={() => handleNextPagination(countOfArticles)}
    >
      {justArrow ? (
        <BsArrowRight />
      ) : (
        <strong className="arrows-bold">
          Next
          <GrNext />
        </strong>
      )}
    </PaginationBtn>
  </PaginationContainer>
);

export default PaginationButtons;
