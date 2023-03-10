import { Col, Container, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import PostSiteHead from 'components/shared/head/PostSiteHead';
import SingleSubHeader from 'layouts/SingleSubHeader';
import PostBody from 'components/organisms/post/PostBody';
import Sidebar from 'components/organisms/post/PostSidebar';
import AboutAuthorCard from '../common/AboutAuthorCard';
import { ColSideBar } from '../../styles/Sidebar.style';
import Subscription from '../molecules/subscription/Subscription';
import RelatedPosts from '../organisms/post/RelatedPosts';
import RecommendedPosts from '../common/RecommendedPosts';

const PrintOnlyBody = dynamic(() => import('components/organisms/post/PrintOnlyBody'));

const PostPage = ({
  post,
  seo,
  categories,
  canonicalUrl,
  authors,
  corePractices,
  relatedPosts,
  posts,
}) => {
  const sideBarProps = {
    authorsForCards: authors,
    corePractices,
  };

  return (
    <>
      <PostSiteHead seo={seo} canonicalUrl={canonicalUrl} post={post} authors={authors} />
      <SingleSubHeader
        title={post.title}
        subtitle={post.subTitle}
        isBlog
        offset={0}
        span={8}
        authors={authors}
        date={post.date}
      />
      <Container className="d-print-none">
        <Row className="gap-4 d-flex justify-content-center">
          <Col sm={12} lg={7}>
            <PostBody
              content={post.content}
              title={post.title}
              subTitle={post.subTitle}
              date={post.date}
              categories={categories}
            />
            <Row>
              <Col className="d-flex flex-column gap-4" sm={12} lg={6}>
                <AboutAuthorCard authors={authors} />
              </Col>
              <Col className="d-flex flex-column gap-4" sm={12} lg={6}>
                <Subscription />
              </Col>
            </Row>
          </Col>
          <Col sm={10} lg={4} className="d-print-none px-0">
            <ColSideBar sm={12} lg={4} className="d-print-none px-0">
              <Sidebar {...sideBarProps} />
            </ColSideBar>
            <RelatedPosts posts={relatedPosts} />
          </Col>
        </Row>
      </Container>
      <PrintOnlyBody
        featuredImage={post.featuredImage}
        content={post.content}
        title={post.title}
        subTitle={post.subTitle}
        authors={authors}
        date={post.date}
      />
      <RecommendedPosts
        titleGeneralBlock="firm News & Press Releases"
        attorneyFooterNewsArticles={posts}
      />
    </>
  );
};

export default PostPage;
