import React, { Fragment } from 'react';
import { LibraryCategoriesWrapper } from 'styles/library/LibraryCategory.style';
import empty from 'is-empty';
import LogoSeparator from 'components/common/LogoSeparator';
import LibraryCategory from './LibraryCategory';

const LibraryCategories = ({ categories }) => {
  if (empty(categories)) return null;
  return (
    <LibraryCategoriesWrapper>
      {categories.map((category, index) => (
        <Fragment key={category?.databaseId}>
          <LibraryCategory
            title={category?.title}
            link={category?.uri}
            posts={category?.posts}
          />
          {index < categories.length - 1 && (
            <LogoSeparator direction="row" isBig />
          )}
        </Fragment>
      ))}
    </LibraryCategoriesWrapper>
  );
};

export default LibraryCategories;
