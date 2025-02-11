import React, { useCallback } from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  LibraryResultsHolder,
  LibraryResultsSection,
  LibraryResultsBlock,
} from 'styles/library/LibraryResults.style';
import empty from 'is-empty';
import { LibraryCards } from 'styles/library/LibraryCategory.style';
import LibraryCard from 'components/molecules/library/LibraryCard';
import CustomPagination from 'components/atoms/CustomPagination';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  setSelectedTags,
  setSelectedValues,
} from '../../../redux/slices/library.slice';
import LibraryTags from './LibraryTags';
import LibraryResultsCount from './LibraryResultsCount';

const FiltersNoResults = dynamic(() => import('components/molecules/common/FiltersNoResults'));
const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));

const LibraryResults = ({ tags, postsData }) => {
  const {
    posts, total, currentPage, postsPerPage,
  } = postsData;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClearFilters = useCallback(() => {
    dispatch(setSelectedValues({}));
    dispatch(setSelectedTags([]));
    router.push('/library');
  }, []);

  return (
    <LibraryResultsSection>
      <ContainerDefault>
        {empty(posts) ? (
          <>
            <FiltersNoResults
              message="Sorry, there are no results for your combination of filters. Try changing the category or reducing the number of filters."
              handleClickButton={handleClearFilters}
              buttonLabel="Reset filters"
            />

            <LogoSeparator direction="row" isBig />
          </>
        ) : (
          <LibraryResultsHolder>
            <LibraryTags tags={tags} />

            <LibraryResultsBlock>
              <LibraryResultsCount
                limit={postsPerPage}
                currentPage={currentPage}
                total={total}
              />

              {!empty(posts) && (
                <LibraryCards>
                  {posts?.map((post) => (
                    <LibraryCard
                      key={post.databaseId}
                      title={post?.title}
                      image={post?.featuredImage}
                      uri={post?.uri}
                      description={post?.excerpt}
                      author={post?.author}
                      date={post?.date}
                      tags={post?.tags}
                    />
                  ))}
                </LibraryCards>
              )}
            </LibraryResultsBlock>

            <CustomPagination
              totalItems={total}
              currentPage={currentPage}
              limit={postsPerPage}
              showCount={false}
              scrollAfterChange
            />
          </LibraryResultsHolder>
        )}
      </ContainerDefault>
    </LibraryResultsSection>
  );
};

export default LibraryResults;
