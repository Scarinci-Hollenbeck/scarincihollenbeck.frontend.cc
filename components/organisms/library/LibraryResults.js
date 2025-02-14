import React, { useCallback, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedTags,
  setSelectedValues,
} from '../../../redux/slices/library.slice';
import LibraryTags from './LibraryTags';
import LibraryResultsCount from './LibraryResultsCount';

const FiltersNoResults = dynamic(() => import('components/molecules/common/FiltersNoResults'));
const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));

const LibraryResults = ({ tags, postsData }) => {
  if (empty(postsData)) return null;
  const {
    posts, total, currentPage, postsPerPage,
  } = postsData;
  const dispatch = useDispatch();
  const router = useRouter();
  const debounceRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const { selectedTags } = useSelector((state) => state.library);

  const handleClearFilters = useCallback(() => {
    dispatch(setSelectedValues({}));
    dispatch(setSelectedTags([]));
    router.push('/library/search');
  }, []);

  const debounceTagClick = useCallback(
    (tagsArray) => {
      if (debounceRef.current) {
        clearInterval(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const tagIds = tagsArray.map((tag) => tag.databaseId).join(',');
        const updatedQuery = { ...router.query };

        if (tagIds.length > 0) {
          updatedQuery.tag = tagIds;
        } else {
          delete updatedQuery.tag;
        }

        if (updatedQuery?.page > 1) {
          updatedQuery.page = 1;
        } else {
          delete updatedQuery.page;
        }

        const currentQueryString = new URLSearchParams(router.query).toString();
        const updatedQueryString = new URLSearchParams(updatedQuery).toString();

        if (currentQueryString !== updatedQueryString) {
          router.push(
            {
              pathname: router.pathname,
              query: updatedQuery,
            },
            undefined,
            { scroll: false },
          );
        }
      }, 1000);
    },
    [router],
  );

  const onTagClick = useCallback(
    (tag) => {
      const { name, databaseId, uri } = tag;
      const isTagSelected = selectedTags.some(
        (selectedTag) => selectedTag.databaseId === databaseId,
      );

      if (!isTagSelected) {
        const tags = [...selectedTags, { value: name, databaseId, slug: uri }];
        debounceTagClick(tags);
        dispatch(setSelectedTags(tags));
      }

      if (resultsContainerRef.current) {
        const offsetTop = resultsContainerRef.current.offsetTop - 120;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    },
    [selectedTags, debounceTagClick],
  );

  return (
    <LibraryResultsSection ref={resultsContainerRef}>
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
            <LibraryTags tags={tags} handleClickTag={debounceTagClick} />

            <LibraryResultsBlock>
              <LibraryResultsCount
                limit={postsPerPage}
                currentPage={currentPage}
                total={total}
              />

              <LibraryCards>
                {posts.map((post) => (
                  <LibraryCard
                    key={post.databaseId}
                    title={post?.title}
                    image={post?.featuredImage}
                    uri={post?.uri}
                    description={post?.excerpt}
                    author={post?.author}
                    date={post?.date}
                    tags={post?.tags}
                    onTagClick={onTagClick}
                  />
                ))}
              </LibraryCards>
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
