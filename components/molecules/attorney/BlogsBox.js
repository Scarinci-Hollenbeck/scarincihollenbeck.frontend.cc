import { changePostLink } from 'utils/helpers';
import { useMemo } from 'react';
import SimpleNewsCard from '../../common/SimpleNewsCard';
import CustomPagination from '../../atoms/CustomPagination';
import Loader from '../../atoms/Loader';
import {
  BlogsBoxList,
  BlogsBoxWrapper,
} from '../../../styles/attorney-page/BlogsBox.style';

const sanitizePosts = (postsArg, authorId) => postsArg?.edges.map(({ node }) => {
  const combinedAuthors = [
    ...(node?.selectAuthors?.authorDisplayOrder || []),
    ...(node?.selectHeroes?.selectAttorneys || []),
  ];

  const uniqueAuthors = combinedAuthors.filter((author, index, self) => {
    const id = author?.databaseId;
    if (!id || id === 156871) return false; // 156871 is the Scarinci Hollenbeck, LLC author

    return index === self.findIndex((a) => a?.databaseId === id);
  });

  const authors = uniqueAuthors.map((author) => {
    const isCurrent = author?.attorneyAuthorId?.authorId?.databaseId === authorId;
    return isCurrent ? { ...author, isCurrent: true } : author;
  });

  const services = [
    ...(node?.linksToOtherPostTypes?.practices || []),
    ...(node?.linksToOtherPostTypes?.industries || []),
  ];

  return {
    ...node,
    services,
    authors,
  };
});

const BlogsBox = ({
  paginationData,
  queryParamsForPagination,
  isWideCards,
  authorId,
}) => {
  const {
    posts, limit, page, loading, error,
  } = paginationData;

  if (error) {
    return null;
  }

  const memoData = useMemo(
    () => sanitizePosts(posts, authorId),
    [paginationData, authorId],
  );

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
                title={article?.title}
                date={article?.date}
                services={article?.services}
                authors={article?.authors}
                isWide={isWideCards}
                isTransparent
                isBlueTitle
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
