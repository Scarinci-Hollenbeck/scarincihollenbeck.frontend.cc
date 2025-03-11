import BackArrow from 'components/atoms/BackArrow';
import React, { forwardRef } from 'react';
import { PostConnections, PostContent } from 'styles/Post/PostBody.style';
import empty from 'is-empty';
import ContentRender from 'components/atoms/ContentRender';
import {
  LibraryTag,
  LibraryTagLink,
  LibraryTags,
} from 'styles/library/LibraryTags.style';
import DisclaimerText from 'components/atoms/DisclaimerText';
import PostLinks from './PostLinks';

const PostContentRender = forwardRef((props, ref) => {
  const {
    backLink,
    content,
    tags,
    postTypeConnections,
    isPrint,
    customClassContent,
  } = props;
  const { practices, location, industries } = postTypeConnections;
  return (
    <PostContent ref={ref}>
      {!empty(backLink) && <BackArrow href={backLink} />}

      <ContentRender
        content={content}
        isPrint={isPrint}
        customClass={customClassContent}
      />

      {!empty(tags) && (
        <LibraryTags>
          {tags.map((tag) => (
            <LibraryTag key={tag?.databaseId}>
              <LibraryTagLink href={`/library/search?tag=${tag?.databaseId}`}>
                {tag?.name}
              </LibraryTagLink>
            </LibraryTag>
          ))}
        </LibraryTags>
      )}

      <PostConnections>
        <PostLinks
          items={industries}
          title="Industries"
          queryParam="industries"
        />
        <PostLinks items={practices} title="Practices" queryParam="practices" />
        <PostLinks items={location} title="Locations" queryParam="offices" />
      </PostConnections>

      <DisclaimerText text="No Aspect of the advertisement has been approved by the Supreme Court. Results may vary depending on your particular facts and legal circumstances." />
    </PostContent>
  );
});

export default PostContentRender;
