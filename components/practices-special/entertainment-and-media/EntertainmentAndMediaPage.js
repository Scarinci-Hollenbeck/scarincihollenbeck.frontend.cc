import dynamic from 'next/dynamic';
import BasicSiteHead from '../../shared/head/BasicSiteHead';
import SubHeader from '../../../layouts/SubHeader/SubHeader';
import useApolloQuery from '../../../hooks/useApolloQuery';
import {
  categoryPostsByIdQuery,
  getClientsQuery,
} from '../../../requests/graphql-queries';
import useAnchorLink from '../../../hooks/useAnchorLink';

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
  entertainmentAndMediaData,
  practices,
}) => {
  const { setHref, hrefToId } = useAnchorLink();
  const anchorIdToAttorneys = 'practiceAttorneys';
  const handleClickByAnchorToAttorneys = () => setHref(anchorIdToAttorneys);

  const {
    handleClientsPrevPagination,
    handleClientsNextPagination,
    clients,
    loadingClients,
  } = useApolloQuery(getClientsQuery, {
    first: 10,
    last: null,
    after: null,
    before: null,
  });

  const {
    handleNextPagination,
    handlePrevPagination,
    data,
    loadingPosts,
    error,
    posts,
  } = useApolloQuery(
    categoryPostsByIdQuery,
    {
      first: 3,
      last: null,
      after: null,
      before: null,
      categoryId: 1066,
    },
    // skipOrGo,
  );

  const paginationDataProps = {
    handleNextPagination,
    handlePrevPagination,
    data: posts,
    loading: loadingPosts,
    error,
  };

  const clientsPaginationProps = {
    handleClientsPrevPagination,
    handleClientsNextPagination,
    data: clients,
    loading: loadingClients,
    error,
  };

  const sliderCfg = {
    isSlidesAutoPlay: true,
    autoPlaySpeed: 3000,
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
        slidesData={entertainmentAndMediaData.sliderBackgrounds}
        subtitle={entertainmentAndMediaData.subTitle}
        title={practice.title}
        sliderCfg={sliderCfg}
        handleClickAnchor={handleClickByAnchorToAttorneys}
        anchorId={anchorIdToAttorneys}
      />
      <AttorneysBlock
        attorneyListPractice={attorneyListPractice}
        chairPractice={chairPractice}
        title={entertainmentAndMediaData.attorneysTitleBox}
        anchorLinkToAttorneys={hrefToId}
      />
      <EntertainmentInfoBlock
        handleClickForAnchor={handleClickByAnchorToAttorneys}
        anchorToAttorneysBlock={anchorIdToAttorneys}
        tabs={entertainmentAndMediaData.entertainmentInfoBlock.tabs}
      />
      <EntertainmentClientsBlock
        title={entertainmentAndMediaData.clientsBlock.title}
        description={entertainmentAndMediaData.clientsBlock.description}
        clientsApolloProps={clientsPaginationProps}
      />
      <ArticlesBlock paginationData={paginationDataProps} />
      <PracticesLinksBlock
        practicesListTitle={entertainmentAndMediaData.practicesList.title}
        practices={practices}
        practicesFooterImage={
          entertainmentAndMediaData.practicesList.imageUnderTitle
        }
      />
    </>
  );
};

export default EntertainmentAndMediaPage;
