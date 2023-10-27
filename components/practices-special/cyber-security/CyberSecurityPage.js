import dynamic from 'next/dynamic';
import BasicSiteHead from '../../shared/head/BasicSiteHead';
import SubHeader from '../../../layouts/SubHeader/SubHeader';
import useApolloQuery from '../../../hooks/useApolloQuery';
import { categoryPostsByIdQuery } from '../../../requests/graphql-queries';

const AttorneysBlock = dynamic(() => import('../../organisms/ent-and-media/AttorneysBlock'));
const ArticlesBlock = dynamic(() => import('../../organisms/ent-and-media/ArticlesBlock'));
const PracticesLinksBlock = dynamic(() => import('../../organisms/ent-and-media/PracticesLinksBlock'));

const CyberSecurityPage = ({
  practice,
  canonicalUrl,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  cyberSecurityData,
  practices,
}) => {
  const {
    handleNextPagination, handlePrevPagination, data, loading, error,
  } = useApolloQuery(
    categoryPostsByIdQuery,
    {
      first: 3,
      last: null,
      after: null,
      before: null,
      categoryId: 911,
    },
    // skipOrGo,
  );

  const paginationDataProps = {
    handleNextPagination,
    handlePrevPagination,
    data,
    loading,
    error,
  };

  return (
    <>
      <BasicSiteHead
        title={practice.seo.title}
        metaDescription={practice.seo.metaDescription}
        canonicalUrl={canonicalUrl}
        personDataForSchema={attorneysSchemaData}
      />
      <SubHeader
        subtitle={cyberSecurityData.subTitle}
        title={practice.title}
        backgroundGif={cyberSecurityData.backgroundGif}
        subHeaderBgLogo={cyberSecurityData.subHeaderBgLogo}
        attorneyListPractice={attorneyListPractice}
      />

      <AttorneysBlock
        attorneyListPractice={attorneyListPractice}
        chairPractice={chairPractice}
      />

      <ArticlesBlock paginationData={paginationDataProps} />

      <PracticesLinksBlock
        practices={practices}
        practicesFooterImage={cyberSecurityData.practicesFooterImage}
      />
    </>
  );
};

export default CyberSecurityPage;
