import React from 'react';
import empty from 'is-empty';
import { SubHeaderCategory } from 'styles/subheader/SubHeader.style';

const SubHeaderCategoryRender = ({ categoryTitle, categoryColor }) => {
  if (empty(categoryTitle)) return null;
  return (
    <SubHeaderCategory $lineColor={categoryColor}>
      <p>{categoryTitle}</p>
    </SubHeaderCategory>
  );
};

export default SubHeaderCategoryRender;
