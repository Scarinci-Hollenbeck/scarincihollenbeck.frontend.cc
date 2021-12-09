import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FadeLoader from 'react-spinners/FadeLoader';
import Axios from 'axios';
import Article from 'components/molecules/library/article';
import ArticlePagination from 'components/molecules/library/pagination';

export default function ArticleArchives({ url, title }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  useEffect(() => {
    setLoading(true);
    Axios.get(url, {
      params: { page },
    }).then((response) => {
      setNumberofpage(response.headers['x-wp-totalpages']);
      if (page === 1) {
        const modResults = response.data.slice(4, response.data.length);
        setPosts(modResults);
      } else {
        setPosts(response.data);
      }
      setLoading(false);
    });
  }, [page, setPosts, url]);

  const handlePrevPage = () => setPage(page - 1 ? page - 1 : 1);
  const handleNextPage = () => setPage(page < nrofpages ? page + 1 : nrofpages);

  return (
    <Row>
      {title && (
        <Col sm={12}>
          <h4 className="mb-3 mx-3">
            <strong className="text-capitalize">{title}</strong>
          </h4>
        </Col>
      )}
      {loading && (
        <div
          className="d-flex flex-colum justify-content-center align-items-center"
          style={{ height: '300px' }}
        >
          <FadeLoader size={32} color="#a9a9a9" />
        </div>
      )}
      {posts.length > 0 && (
        <>
          <Col sm={12}>
            <ArticlePagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              setPage={setPage}
              page={page}
              nrofpages={nrofpages}
            />
          </Col>
          {posts.map((post) => (
            <Article key={post.id} post={post} />
          ))}
          <Col sm={12}>
            <ArticlePagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              setPage={setPage}
              page={page}
              nrofpages={nrofpages}
            />
          </Col>
        </>
      )}
      {!loading && posts.length === 0 && (
        <div className="w-100 text-center m-4">There are no more articles...</div>
      )}
    </Row>
  );
}
