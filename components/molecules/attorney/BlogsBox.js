import { changePostLink } from 'utils/helpers';
import { useMemo } from 'react';
import SimpleNewsCard from '../../common/SimpleNewsCard';
import CustomPagination from '../../atoms/CustomPagination';
import Loader from '../../atoms/Loader';
import {
  BlogsBoxList,
  BlogsBoxWrapper,
} from '../../../styles/attorney-page/BlogsBox.style';

const sanitizePosts = (postsArg) => postsArg?.edges.map(({ node }) => {
  if (typeof node.author !== 'string') {
    node.author = node.author.node.name;
  }
  return {
    ...node,
  };
});
const BlogsBox = ({
  paginationData,
  queryParamsForPagination,
  isWideCards,
  isWhiteCards,
}) => {
  const {
    posts, limit, page, loading, error,
  } = paginationData;

  if (error) {
    return null;
  }

  const memoData = useMemo(() => sanitizePosts(posts), [paginationData]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <BlogsBoxWrapper>
          <BlogsBoxList>
            {memoData.map((article) => (
              <SimpleNewsCard
                key={article?.databaseId || article?.uri}
                link={{ url: changePostLink(article?.uri) }}
                textPost={article?.excerpt}
                title={article?.title}
                label={article?.author}
                date={article?.date}
                isJSXDescription
                isAuthor
                isWide={isWideCards}
                isWhite={isWhiteCards}
              />
            ))}
          </BlogsBoxList>
          <CustomPagination
            totalItems={posts?.pageInfo?.offsetPagination?.total}
            currentPage={page}
            limit={limit}
            queryParam={queryParamsForPagination}
          />
        </BlogsBoxWrapper>
      )}
    </>
  );
};

export default BlogsBox;
