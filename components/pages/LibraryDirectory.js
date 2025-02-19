import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Container, Row, Col } from 'react-bootstrap';
import SubHeader from 'layouts/SubHeader/SubHeader';
import BodyHeader from 'components/organisms/library/BodyHeader';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import { useMemo } from 'react';
import {
  postsForPaginationByAuthorIdQuery,
  postsForPaginationByCategoryIdQuery,
} from 'requests/graphql-queries';
import { getPaginationData } from 'requests/getPaginationData';
import NewsCard from '../organisms/home/FirmNews/NewsCard';
import LibrarySideBar from '../organisms/library/LibrarySideBar';

const PostList = dynamic(import('components/molecules/PostList'));

const LibraryDirectory = ({
  news,
  popularCategories,
  childrenOfCurrentCategory,
  categoryName,
  description,
  seo,
  profileUrl,
  categoryId,
}) => {
  const router = useRouter();
  const logoImage = '/images/no-image-found-diamond-750x350.png';
  const memoDataPosts = useMemo(() => news, [news]);
  const mainNews = memoDataPosts[0];

  const isAuthor = router.asPath.includes('author');

  const params = {
    id: null,
    authorId: isAuthor ? categoryId : null,
    categoryId: !isAuthor ? categoryId : null,
    currentPage: router?.query?.page || 1,
    itemsPerPage: 6,
  };

  const paginationData = getPaginationData(
    isAuthor
      ? postsForPaginationByAuthorIdQuery
      : postsForPaginationByCategoryIdQuery,
    params,
  );
  return (
    <>
      {Object.keys(seo).length > 0 ? (
        <BasicSiteHead
          title={seo.title}
          metaDescription={seo.metaDescription}
          canonicalUrl={seo.canonicalUrl}
        />
      ) : (
        <BasicSiteHead title={categoryName} metaDescription={description} />
      )}
      <SubHeader title={categoryName} subtitle={description} />
      <Container className="mb-5">
        <Row>
          <BodyHeader />
          <Col sm={12} lg={9}>
            {memoDataPosts.length > 0 && (
              <Col sm={12} xl={8} className="m-auto">
                <NewsCard
                  postSlug={mainNews.link}
                  postImage={mainNews.image || logoImage}
                  postTitle={mainNews.title}
                  postDate={mainNews.date}
                  postAuthor={mainNews.author}
                  postExcerpt={mainNews.excerpt || mainNews.description}
                  isVertical="true"
                />
              </Col>
            )}
            <div className="pt-4 mb-5">
              <PostList content={paginationData} />
            </div>
          </Col>
          <Col
            sm={12}
            lg={3}
            className="d-flex flex-column justify-content-start"
          >
            <LibrarySideBar
              isAuthor={isAuthor}
              profileUrl={profileUrl}
              childrenOfCurrentCategory={childrenOfCurrentCategory}
              popularCategories={popularCategories}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LibraryDirectory;
