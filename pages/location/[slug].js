import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import LocationPage from 'components/pages/LocationPage';
import { BASE_API_URL, headers, PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import { getOfficeAndMoreData } from 'requests/graphql-queries';
import empty from 'is-empty';
import { getAttorneys } from 'requests/getAttorneys';
import { getPractices } from 'requests/getPractices';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

const SiteLoader = dynamic(() => import('components/shared/SiteLoader'));

const getOfficeData = async (slug) => {
  const { officeLocation, officeLocations } = await fetchAPI(
    getOfficeAndMoreData,
    {
      variables: { id: slug },
    },
  );

  if (empty(officeLocation)) return null;

  if (
    officeLocation?.officeMainInformation?.autoMap?.mediaItemUrl?.length > 0
  ) {
    officeLocation.officeMainInformation.autoMap = officeLocation.officeMainInformation.autoMap.mediaItemUrl;
  }
  if (
    officeLocation?.officeMainInformation?.trainStationsMap?.mediaItemUrl
      ?.length > 0
  ) {
    officeLocation.officeMainInformation.trainStationsMap = officeLocation.officeMainInformation.trainStationsMap.mediaItemUrl;
  }

  const currentOffice = {
    databaseId: officeLocation.databaseId,
    title: officeLocation.title,
    featuredImage: officeLocation.featuredImage.node.sourceUrl,
    seo: officeLocation.seo,
    ...officeLocation.officeMainInformation,
  };

  const offices = officeLocations.nodes.map((office) => ({
    databaseId: office.databaseId,
    featuredImage: office.featuredImage.node.sourceUrl,
    uri: office.uri,
    slug: office.slug,
    ...office.officeMainInformation,
  }));
  return {
    currentOffice,
    offices,
  };
};

/** Fetch all the location pages urls from WP REST API * */
const getLocationPaths = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/wp-json/location-portal/offices`, {
      headers,
    });
    const resToJson = await res.json();

    return resToJson.offices.map((o) => o.slug);
  } catch (error) {
    console.error(error);
  }
};

/** fetch and build urls for static pages generation */
export const getStaticPaths = async () => {
  const paths = await getLocationPaths();
  return {
    paths,
    fallback: 'blocking',
  };
};

/** set location data to page props */
export const getStaticProps = async ({ params }) => {
  // 04.04.2024 Google reviews temporarily disabled
  // const googleReviews = await getGoogleReviewsForPalaces(
  //   Object.values(googleLocationIds),
  // );
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }
  const officesData = await getOfficeData(slug);
  if (empty(officesData)) {
    return {
      notFound: true,
    };
  }

  const { currentOffice, offices } = officesData;
  const attorneys = await getAttorneys();
  attorneys.sort((a, b) => {
    const aLoc = a.location_array.find((loc) => loc.officeMainInformation);
    const bLoc = b.location_array.find((loc) => loc.officeMainInformation);
    if (!aLoc || !bLoc) {
      // If either attorney doesn't have a location with officeMainInformation, don't sort
      return 0;
    }
    return aLoc.officeMainInformation.localeCompare(bLoc.officeMainInformation);
  });

  currentOffice.attorneys = attorneys.filter((attorney) => {
    const location = attorney.location_array[0];
    const slugFromUri = location.uri;
    return slugFromUri.includes(slug);
  }) || [];

  if (!currentOffice) {
    return {
      notFound: true,
    };
  }

  const practices = await getPractices();

  const { postsData } = await getFilteredLibraryData({
    offices: currentOffice?.databaseId,
    limit: '8',
  });

  const attorneysSchema = currentOffice.attorneys.map((attorney) => ({
    '@type': 'Person',
    name: attorney.title,
    designation: attorney.designation,
    image: attorney.better_featured_image,
    url: `${PRODUCTION_URL}/attorneys/${attorney.link}`,
    telephone: attorney.phone,
    jobTitle: 'Attorney',
  }));

  return {
    props: {
      offices: offices || {},
      seo: currentOffice.seo || {},
      currentOffice,
      attorneysSchemaData: attorneysSchema,
      posts: postsData?.posts || [],
      canonicalUrl: `${PRODUCTION_URL}/location/${slug}`,
      practices,
      // googleReviews: deleteReviewsWithoutComment(googleReviews.flat()),
    },
    revalidate: 86400,
  };
};

/* Single location page component * */
const SingleLocation = ({
  seo,
  offices,
  currentOffice,
  posts,
  attorneysSchemaData,
  canonicalUrl,
  practices,
  googleReviews,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <SiteLoader />;
  }

  const locationProps = {
    seo,
    currentOffice,
    attorneysSchemaData,
    posts,
    canonicalUrl,
    locations: offices,
    practices,
    googleReviews,
  };

  return <LocationPage {...locationProps} />;
};

export default SingleLocation;
