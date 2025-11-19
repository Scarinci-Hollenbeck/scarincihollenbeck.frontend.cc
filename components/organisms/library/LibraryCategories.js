import React, { Fragment } from 'react';
import { LibraryCategoriesWrapper } from 'styles/library/LibraryCategory.style';
import empty from 'is-empty';
import LogoSeparator from 'components/common/LogoSeparator';
import LibraryCategory from './LibraryCategory';

const LibraryCategories = ({ categories }) => {
  const validCategories = categories?.filter(
    (category) => !empty(category?.posts),
  );
  if (empty(validCategories)) return null;

  return (
    <LibraryCategoriesWrapper>
      {validCategories.map((category, index) => (
        <Fragment key={category?.databaseId}>
          <LibraryCategory
            title={category?.title}
            link={category?.uri}
            posts={category?.posts}
          />
          {index < validCategories.length - 1 && (
            <LogoSeparator direction="row" isBig isContainer />
          )}
        </Fragment>
      ))}
    </LibraryCategoriesWrapper>
  );
};

export default LibraryCategories;
