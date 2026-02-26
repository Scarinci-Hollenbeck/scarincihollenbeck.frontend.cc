import CareerProfile from 'components/pages/CareerPage';
import { fetchAPI } from 'requests/api';
import { careerPageQuery } from 'requests/graphql-queries';
import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { stripHtml } from 'utils/helpers';
import empty from 'is-empty';

const EMPLOYMENT_TYPE_MAP = {
  'full time': 'FULL_TIME',
  'full-time': 'FULL_TIME',
  'part time': 'PART_TIME',
  'part-time': 'PART_TIME',
  contract: 'CONTRACTOR',
  contractor: 'CONTRACTOR',
  temporary: 'TEMPORARY',
  temp: 'TEMPORARY',
  intern: 'INTERN',
  internship: 'INTERN',
};

/** Fetch career post data from WP REST API */
const getCareerPageContent = async (slug) => {
  const data = await fetchAPI(careerPageQuery, {
    variables: { slug },
  });

  if (data.career?.status !== 'publish') {
    return null;
  }

  return data?.career;
};

const careersSlugsQuery = `
query careersSlugs {
  careers(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

export async function getStaticPaths() {
  const listId = await fetchAPI(careersSlugsQuery);

  const paths = [];

  listId?.careers?.nodes?.forEach((node) => {
    paths.push(`/careers/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const careersContent = await getCareerPageContent(params.slug);

  if (empty(careersContent)) {
    return {
      notFound: true,
    };
  }

  const {
    title, seo, careerFields, pagesFields, date,
  } = careersContent;

  const canonicalUrl = `${PRODUCTION_URL}/careers/${params.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Careers', url: `${CURRENT_DOMAIN}/careers` },
    { name: title },
  ];

  const rawDuration = careerFields?.duration?.toLowerCase();
  const employmentType = EMPLOYMENT_TYPE_MAP[rawDuration] || null;

  const jobPostingData = {
    title,
    description: stripHtml(pagesFields?.description) || seo.metaDesc,
    url: canonicalUrl,
    datePosted: date,
    ...(employmentType && { employmentType }),
    locations:
      careerFields?.locations?.map((loc) => ({
        name: loc.title,
        url: loc.uri ? `${PRODUCTION_URL}${loc.uri}` : null,
      })) || [],
  };

  return {
    props: {
      career: careersContent,
      canonicalUrl,
      breadcrumbs,
      jobPostingData,
    },
    revalidate: 600,
  };
};

const Career = ({
  career, canonicalUrl, breadcrumbs, jobPostingData,
}) => {
  const careerProps = {
    career,
    canonicalUrl,
    breadcrumbs,
    jobPostingData,
  };
  return <CareerProfile {...careerProps} />;
};

export default Career;
