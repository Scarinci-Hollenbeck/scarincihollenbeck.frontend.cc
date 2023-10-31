import dynamic from 'next/dynamic';
import BasicSiteHead from '../../shared/head/BasicSiteHead';
import SubHeader from '../../../layouts/SubHeader/SubHeader';
import useApolloQuery from '../../../hooks/useApolloQuery';
import { categoryPostsByIdQuery } from '../../../requests/graphql-queries';

const AttorneysBlock = dynamic(() => import('../../organisms/common-practices-specials/AttorneysBlock'));
const EntertainmentInfoBlock = dynamic(() => import('../../organisms/ent-and-media/EntertainmentInfoBlock'));
const EntertainmentClientsBlock = dynamic(() => import('../../organisms/ent-and-media/EntertainmentClientsBlock'));
const ArticlesBlock = dynamic(() => import('../../organisms/ent-and-media/ArticlesBlock'));
const PracticesLinksBlock = dynamic(() => import('../../organisms/ent-and-media/PracticesLinksBlock'));

const EntertainmentAndMediaPage = ({
  practice,
  canonicalUrl,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  entAndMediaData,
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
        slidesData={entAndMediaData.slidesData}
        subtitle={entAndMediaData.subTitle}
        title={practice.title}
        sliderCfg={entAndMediaData.sliderCfg}
        subHeaderBtns={entAndMediaData.subHeaderBtns}
      />

      <AttorneysBlock
        attorneyListPractice={attorneyListPractice}
        chairPractice={chairPractice}
        title={entAndMediaData.attorneysBlockTitle}
        isUnderline
      />

      <EntertainmentInfoBlock tabs={entAndMediaData.infoBlock.tabs} />

      <EntertainmentClientsBlock
        items={entAndMediaData.enterntainmentClientsData.toggleItems}
        itemsPerPage={entAndMediaData.enterntainmentClientsData.itemsPerPage}
        title={entAndMediaData.enterntainmentClientsData.title}
        description={entAndMediaData.enterntainmentClientsData.description}
      />
      <ArticlesBlock paginationData={paginationDataProps} />

      <PracticesLinksBlock
        practices={practices}
        practicesFooterImage={entAndMediaData.practicesFooterImage}
      />
    </>
  );
};

export default EntertainmentAndMediaPage;
