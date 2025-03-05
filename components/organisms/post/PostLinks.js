import React, { Fragment } from 'react';
import empty from 'is-empty';
import { PostConnection, PostConnectionLink } from 'styles/Post/PostBody.style';

const PostLinks = ({ items, title, queryParam }) => {
  if (empty(items)) return null;
  return (
    <PostConnection>
      <span>{`${title}: `}</span>
      {items.map((item, index) => (
        <Fragment key={item?.databaseId}>
          <PostConnectionLink
            href={`/library/search?${queryParam}=${item?.databaseId}`}
          >
            {item?.title}
          </PostConnectionLink>
          {index !== items.length - 1 && ', '}
        </Fragment>
      ))}
    </PostConnection>
  );
};

export default PostLinks;
