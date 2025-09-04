import CareersPage from 'components/pages/CareersDirectory';
import { PRODUCTION_URL } from 'utils/constants';
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
    },
    revalidate: 600,
  };
};

/** The careers page directory component */
const CareersDirectory = ({ careerList, seo, site }) => {
  const canonicalUrl = `${PRODUCTION_URL}/careers`;

  const careerProps = {
    seo,
    site,
    canonicalUrl,
    careers: careerList,
  };

  return <CareersPage {...careerProps} />;
};

export default CareersDirectory;
