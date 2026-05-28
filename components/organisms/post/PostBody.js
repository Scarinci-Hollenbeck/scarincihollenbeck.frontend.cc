import {
  PostContentSection,
  PostContentHolder,
} from 'styles/Post/PostBody.style';
import { ContainerDefault } from 'styles/Containers.style';
import { useRef } from 'react';
import PostSidebar from './PostSidebar';
import PostContent from './PostContent';

const PostBody = ({
  backLink,
  content,
  tags,
  postTypeConnections,
  headings,
}) => {
  const contentRef = useRef(null);

  return (
    <PostContentSection>
      <ContainerDefault>
        <PostContentHolder>
          <PostSidebar headings={headings} contentRef={contentRef} />
          <PostContent
            ref={contentRef}
            content={content}
            backLink={backLink}
            tags={tags}
            postTypeConnections={postTypeConnections}
          />
        </PostContentHolder>
      </ContainerDefault>
    </PostContentSection>
  );
};

export default PostBody;
