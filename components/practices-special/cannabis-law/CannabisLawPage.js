import dynamic from 'next/dynamic';
import empty from 'is-empty';
import KeyContactsBlock from 'components/organisms/cannabis-law/KeyContactsBlock';
import { getPaginationData } from 'requests/getPaginationData';
import { postsForPaginationByCategoryIdQuery } from 'requests/graphql-queries';
import { useRouter } from 'next/router';
import BasicSiteHead from '../../shared/head/BasicSiteHead';
import SubHeader from '../../../layouts/SubHeader/SubHeader';
import ArticlesBlock from '../../organisms/cannabis-law/ArticlesBlock';
import useAnchorLink from '../../../hooks/useAnchorLink';

const PhotoBlock = dynamic(() => import('../../organisms/cannabis-law/PhotoBlock'));
const CardsBlock = dynamic(() => import('../../organisms/cannabis-law/CardsBlock'));
const AttorneysBlock = dynamic(() => import('../../organisms/cannabis-law/AttorneysBlock'));
const HelpArticleBlock = dynamic(() => import('../../organisms/cannabis-law/HelpArticleBlock'));
const NewsPaperBlock = dynamic(() => import('../../organisms/cannabis-law/NewsPaperBlock'));
const PracticesListBlock = dynamic(() => import('../../organisms/cannabis-law/PracticesListBlock'));

const CannabisLawPage = ({
  practice,
  canonicalUrl,
  attorneysSchemaData,
  corePractices,
  chairPractice,
  attorneyListPractice,
  keyContactsList,
  cannabisLawData,
}) => {
  const { setHref, hrefToId } = useAnchorLink();
  const anchorIdBlock = 'photoBlock';
  const handleClickByAnchorToPhotoBlock = () => setHref(anchorIdBlock);
  const { query } = useRouter();

  const params = {
    categoryId: 911,
    currentPage: query?.page || 1,
    itemsPerPage: 3,
  };

  const paginationData = getPaginationData(
    postsForPaginationByCategoryIdQuery,
    params,
  );

  return (
    <>
      <BasicSiteHead
        title={practice.seo.title}
        metaDescription={practice.seo.metaDescription}
        canonicalUrl={canonicalUrl}
        personDataForSchema={attorneysSchemaData}
      />
      <SubHeader
        handleClickAnchor={handleClickByAnchorToPhotoBlock}
        backgroundVideo={cannabisLawData.subheaderBackgroundVideo.link}
        anchorId={anchorIdBlock}
        title={practice.title}
        subtitle={cannabisLawData.subTitle}
        article={cannabisLawData.descriptionSubheader}
      />
      <PhotoBlock
        anchorIdBlock={hrefToId}
        photoBlockData={cannabisLawData.photoBlock}
      />
      <CardsBlock cardsBlockData={cannabisLawData.cardsInfo.cards} />
      <AttorneysBlock
        attorneysBlockArticle={cannabisLawData.attorneysArticleBlock}
        attorneyListPractice={attorneyListPractice}
        chairPractice={chairPractice}
      />
      <KeyContactsBlock
        keyContactsData={cannabisLawData.keycontactsblock}
        keyContacts={keyContactsList}
      />
      {(!empty(cannabisLawData.helpArticleBlock.title)
        || !empty(cannabisLawData.helpArticleBlock.paragraphs)) && (
        <HelpArticleBlock
          helpArticleBlockData={cannabisLawData.helpArticleBlock}
        />
      )}
      <NewsPaperBlock
        article={cannabisLawData.newspaperBlock.article}
        newsPepperArticle={cannabisLawData.newspaperBlock.newspaperBox}
      />
      <ArticlesBlock paginationData={paginationData} />
      <PracticesListBlock practiceList={corePractices} />
    </>
  );
};

export default CannabisLawPage;
