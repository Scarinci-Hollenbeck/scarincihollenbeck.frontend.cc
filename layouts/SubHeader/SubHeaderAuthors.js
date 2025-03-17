import React, { Fragment } from 'react';
import {
  SubHeaderAuthor,
  SubHeaderAuthorName,
} from 'styles/subheader/SubHeader.style';
import empty from 'is-empty';
import Link from 'next/link';

const SubHeaderAuthors = ({ authors }) => {
  if (empty(authors)) return null;
  return (
    <SubHeaderAuthor>
      {authors.length > 1 ? <span>Authors: </span> : <span>Author: </span>}
      {authors.map(({ databaseId, display_name, author }, index) => (
        <Fragment key={databaseId}>
          <SubHeaderAuthorName as={Link} href={author?.uri || '/firm-overview'}>
            {display_name}
          </SubHeaderAuthorName>
          {index !== authors.length - 1 && ', '}
        </Fragment>
      ))}
    </SubHeaderAuthor>
  );
};

export default SubHeaderAuthors;
