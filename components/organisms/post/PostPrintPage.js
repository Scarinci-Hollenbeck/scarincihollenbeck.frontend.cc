import React, { useRef } from 'react';
import { useImagesLoad } from 'hooks/useImagesLoad';
import { PrintContainer } from 'styles/common/PrintStyles.style';
import HeaderPrintVersion from 'components/shared/Header/HeaderPrintVersion';
import FooterPrintVersion from 'components/shared/Footer/FooterPrintVersion';
import { useGetLocationsQuery } from '../../../redux/services/project-api';
import PostSubheaderPrint from './PostSubheaderPrint';
import PostContent from './PostContent';
import PostAttorneysPrint from './PostAttorneysPrint';

const PostPrintPage = ({
  title,
  authors,
  content,
  onReady,
  keyContacts,
  category,
  date,
  tags,
  postTypeConnections,
  attorneys,
}) => {
  const { data: locations } = useGetLocationsQuery();

  const containerRef = useRef();
  useImagesLoad(onReady, containerRef);

  return (
    <PrintContainer ref={containerRef}>
      <HeaderPrintVersion locations={locations} />
      <PostSubheaderPrint
        title={title}
        keyContacts={keyContacts}
        authors={authors}
        category={category}
        date={date}
      />

      <PostContent
        content={content}
        tags={tags}
        postTypeConnections={postTypeConnections}
        isPrint
        customClassContent="post-print-content"
      />

      <PostAttorneysPrint attorneys={attorneys} />

      <FooterPrintVersion locations={locations} />
    </PrintContainer>
  );
};

export default PostPrintPage;
