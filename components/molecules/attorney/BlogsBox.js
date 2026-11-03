import { changePostLink } from 'utils/helpers';
import { useMemo } from 'react';
import SimpleNewsCard from '../../common/SimpleNewsCard';
import CustomPagination from '../../atoms/CustomPagination';
import Loader from '../../atoms/Loader';
import {
  BlogsBoxList,
  BlogsBoxWrapper,
} from '../../../styles/attorney-page/BlogsBox.style';

// Query results are immutable (RTK Query store), so build new objects.
const sanitizePosts = (postsArg) => postsArg?.edges.map(({ node }) => ({
  ...node,
  author:
      typeof node.author === 'string' ? node.author : node.author?.node?.name,
}));
const BlogsBox = ({
  paginationData,
  queryParamsForPagination,
  isWideCards,
  isWhiteCards,
}) => {
  const {
    posts, limit, page, loading, error,
  } = paginationData;

  const memoData = useMemo(() => sanitizePosts(posts), [posts]);

  if (error) {
    return null;
  }

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
