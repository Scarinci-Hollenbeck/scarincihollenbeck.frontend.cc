import SectionHeader from 'components/atoms/SectionHeader';
import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  LibraryCards,
  LibraryCategoryHolder,
  LibraryCategorySection,
} from 'styles/library/LibraryCategory.style';
import empty from 'is-empty';
import LibraryCard from 'components/molecules/library/LibraryCard';

const LibraryCategory = ({ title, link, posts }) => {
  if (empty(posts)) return null;
  return (
    <LibraryCategorySection>
      <ContainerDefault>
        <LibraryCategoryHolder>
          <SectionHeader title={title} link={link} linkText="See all" />

          {!empty(posts) && (
            <LibraryCards>
              {posts?.map((post) => (
                <LibraryCard
                  key={post.databaseId}
                  title={post?.title}
                  image={post?.featuredImage?.node?.sourceUrl}
                  uri={post?.uri}
                  description={post?.excerpt}
                  author={post?.author?.node}
                  date={post?.date}
                  tags={post?.tags?.nodes}
                />
              ))}
            </LibraryCards>
          )}
        </LibraryCategoryHolder>
      </ContainerDefault>
    </LibraryCategorySection>
  );
};

export default LibraryCategory;
