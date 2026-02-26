import CareersPage from 'components/pages/CareersDirectory';
import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { fetchAPI } from '../../requests/api';
import { careersPageQuery, careersQuery } from '../../requests/graphql-queries';

/** return careers page content  */
const careersPageContent = async () => {
  const data = await fetchAPI(careersPageQuery, {});
  return data?.pageBy;
};

const getCareerList = async () => {
  const careers = await fetchAPI(careersQuery);
  return careers.careers.nodes;
};

const sanitizeCareers = (careerArr) => {
  const restructured = careerArr.map(
    ({
      databaseId, slug, careerFields, pagesFields,
    }) => ({
      databaseId,
      slug,
      ...careerFields,
      ...pagesFields,
    }),
  );

  return restructured.reduce((result, career) => {
    const { positionType } = career;
    const lowercasePositionType = positionType?.toLowerCase();

    if (!result[lowercasePositionType]) {
      result[lowercasePositionType] = [];
    }

    result[lowercasePositionType].push(career);
    return result;
  }, {});
};

export const getStaticProps = async () => {
  const careerList = await getCareerList();
  const page = await careersPageContent();
  const {
    seo, title, careersPage, featuredImage, focusedCards, pagesFields,
  } = page;

  const canonicalUrl = `${PRODUCTION_URL}/careers`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Careers' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo.title,
    description: seo.metaDesc,
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  };

  const itemListData = careerList.map((career) => ({
    name: career.careerFields?.position || career.slug,
    url: `${CURRENT_DOMAIN}/careers/${career.slug}`,
  }));

  const itemListMeta = {
    name: 'Career Opportunities at Scarinci Hollenbeck',
    url: canonicalUrl,
  };

  return {
    props: {
      seo,
      site: {
        title,
        description: pagesFields.description,
        bodyContent: careersPage.equalEmploymentOpportunityContent,
        image: featuredImage.node.sourceUrl,
        focusedCards: focusedCards?.cards,
      },
      careerList: sanitizeCareers(careerList),
      breadcrumbs,
      webPageData,
      itemListData,
      itemListMeta,
      canonicalUrl,
    },
    revalidate: 600,
  };
};

/** The careers page directory component */
const CareersDirectory = ({
  careerList,
  seo,
  site,
  breadcrumbs,
  webPageData,
  itemListData,
  itemListMeta,
  canonicalUrl,
}) => {
  const careerProps = {
    seo,
    site,
    canonicalUrl,
    careers: careerList,
    breadcrumbs,
    webPageData,
    itemListData,
    itemListMeta,
  };

  return <CareersPage {...careerProps} />;
};

export default CareersDirectory;
