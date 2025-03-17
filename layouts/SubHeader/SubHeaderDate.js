import React from 'react';
import { formatDate } from 'utils/helpers';
import empty from 'is-empty';
import { SubHeaderDate } from 'styles/subheader/SubHeader.style';

const SubHeaderDateRender = ({ date }) => {
  if (empty(date)) return null;
  return (
    <SubHeaderDate>
      <span>Date: </span>
      {formatDate(date)}
    </SubHeaderDate>
  );
};

export default SubHeaderDateRender;
