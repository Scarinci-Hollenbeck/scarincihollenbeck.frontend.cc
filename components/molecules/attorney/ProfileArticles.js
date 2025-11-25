import React from 'react';
import { getPaginationData } from 'requests/getPaginationData';
import { useRouter } from 'next/router';
import { attorneyPostsQuery } from 'requests/graphql-queries';
import BlogsBox from './BlogsBox';
import ProfileSection from './ProfileSection';

const ProfileArticles = (props) => {
  const {
    title, queryParams, params, isWideCards, sectionId,
  } = props;

  const router = useRouter();

  const paginationParams = {
    ...params,
    currentPage: router?.query?.[queryParams] || 1,
    itemsPerPage: params?.itemsPerPage || 3,
  };

  const data = getPaginationData(attorneyPostsQuery, paginationParams);
  return (
    <ProfileSection title={title} sectionId={sectionId}>
      <BlogsBox
        queryParamsForPagination={queryParams}
        paginationData={data}
        isWideCards={isWideCards}
        isWhiteCards
      />
    </ProfileSection>
  );
};

export default ProfileArticles;
