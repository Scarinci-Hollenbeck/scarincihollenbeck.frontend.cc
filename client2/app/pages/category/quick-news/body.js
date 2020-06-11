import Router from 'next/router'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft';
import { urlify } from '../../../utils/helpers';

export default function Body(props) {
  const {
    results,
    pages,
    term,
    currentPage,
    news,
    insight,
    events,
    prev,
    next,
    active,
    loading,
  } = props;

  function handlePagination(e, page) {
    e.preventDefault();
    Router.push({ pathname: `/category/${term}/page/${page}`})
  }


  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          {results.map((r, i) => ( i < 5) && (
            <div className="p-2" key={r.id}>
              <a href={r.link} className="top-article">
                <h5 className="mb-0">{r.title}</h5>
                <p className="mt-0 mb-3 text-muted small-excerpt">
                  {r.description}
                </p>
              </a>
            </div>
          ))}
        </Col>
        <Col sm={12} md={6}>
          {results.map((r, i) => ( i > 5) && (
            <div className="p-2" key={r.id}>
              <a href={r.link} className="top-article">
                <h5 className="mb-0">{r.title}</h5>
                <p className="mt-0 mb-3 text-muted small-excerpt">
                  {r.description}
                </p>
              </a>
            </div>
          ))}
        </Col>
        <Col sm={12}>
        <Pagination>
          <Pagination.First onClick={(e) => handlePagination(e, 1)} />            
          <Pagination.Prev  onClick={(e) => handlePagination(e, currentPage - 1)}/>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{pages}</Pagination.Item>
          <Pagination.Next onClick={(e) => handlePagination(e, currentPage + 1)}/>
          <Pagination.Last onClick={(e) => handlePagination(e, pages)}/>
        </Pagination>
        </Col>
      </Row>
    </Container>
  );
}