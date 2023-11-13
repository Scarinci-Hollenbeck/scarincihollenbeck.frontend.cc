import React, { Fragment, useMemo } from 'react';
import Loader from 'components/atoms/Loader';
import { formatSrcToCloudinaryUrl } from 'utils/helpers';
import PaginationButtons from 'components/atoms/PaginationButtons';
import NewsCard from 'components/organisms/home/FirmNews/NewsCard';

const PostList = ({
  content, isProfile, classNameForCard, justArrow,
}) => {
  const {
    handleNextPagination, handlePrevPagination, data, loading, error,
  } = content;
  const disablePrevBtn = !data?.posts?.pageInfo.hasPreviousPage;
  const disableNextBtn = !data?.posts?.pageInfo.hasNextPage;

  const memoData = useMemo(() => data?.posts?.edges, [data]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!loading
            && memoData.map(({ node }) => (
              <Fragment key={node.title}>
                <NewsCard
                  postSlug={node.uri.replace(
                    'https://scarincihollenbeck.com/',
                    '/',
                  )}
                  postImage={formatSrcToCloudinaryUrl(
                    node.featuredImage?.node?.sourceUrl,
                  )}
                  postTitle={node.title}
                  postDate={node.date}
                  postExcerpt={isProfile ? null : node.excerpt}
                  postAuthor={node.author}
                  isProfile={isProfile}
                  isVertical={isProfile}
                  classNameProp={classNameForCard}
                />
              </Fragment>
            ))}
          <PaginationButtons
            justArrow={justArrow}
            handleNextPagination={handleNextPagination}
            handlePrevPagination={handlePrevPagination}
            countOfArticles={(isProfile && 3) || 6}
            disablePrevBtn={disablePrevBtn}
            disabledNextBtn={disableNextBtn}
          />
        </>
      )}
    </>
  );
};

export default PostList;
