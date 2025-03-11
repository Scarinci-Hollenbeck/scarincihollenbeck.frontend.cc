import {
  PostContentSection,
  PostContentHolder,
} from 'styles/Post/PostBody.style';
import { ContainerDefault } from 'styles/Containers.style';
import { useRef } from 'react';
import PostSidebar from './PostSidebar';
import PostContent from './PostContent';

const PostBody = ({
  backLink, content, tags, postTypeConnections,
}) => {
  const contentRef = useRef(null);

  return (
    <PostContentSection>
      <ContainerDefault>
        <PostContentHolder>
          <PostSidebar content={content} contentRef={contentRef} />
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
