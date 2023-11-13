import dynamic from 'next/dynamic';
import AboutUsBlock from 'components/organisms/cyber-security/AboutUsBlock';
import RepresentativeBlock from 'components/organisms/cyber-security/RepresentativeBlock';
import BasicSiteHead from '../../shared/head/BasicSiteHead';
import SubHeader from '../../../layouts/SubHeader/SubHeader';
import useApolloQuery from '../../../hooks/useApolloQuery';
import { categoryPostsByIdQuery } from '../../../requests/graphql-queries';

const AttorneysBlock = dynamic(() => import('../../organisms/common-practices-specials/AttorneysBlock'));
const ArticlesBlock = dynamic(() => import('../../organisms/cyber-security/ArticlesBlock'));
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
        isUnderline={false}
      />

      <AboutUsBlock
        aboutUsContent={cyberSecurityData.aboutUsContent}
        attorneyListPractice={attorneyListPractice}
        chairPractice={chairPractice}
        maxAttorneys={3}
      />

      <RepresentativeBlock representativeData={cyberSecurityData.representativeData} />

      <ArticlesBlock paginationData={paginationDataProps} />

      {/* <PracticesLinksBlock
        practices={practices}
        practicesFooterImage={cyberSecurityData.practicesFooterImage}
      /> */}
    </>
  );
};

export default CyberSecurityPage;
