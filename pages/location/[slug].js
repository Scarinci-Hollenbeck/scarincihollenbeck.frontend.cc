import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import LocationPage from 'components/pages/LocationPage';
import {
  BASE_API_URL,
  headers,
  PRODUCTION_URL,
  CURRENT_DOMAIN,
  SITE_TITLE,
} from 'utils/constants';
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

  if (empty(officeLocation) || officeLocation?.status !== 'publish') return null;

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
    pageSchemaJsonLd: officeLocation?.pageSchemaJsonLd ?? null,
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

  const { currentOffice, offices, pageSchemaJsonLd } = officesData;
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

  const attorneysSchema = currentOffice.attorneys.map((attorney) => {
    const profileUrl = `${PRODUCTION_URL}${attorney.link}`;
    return {
      '@type': 'Person',
      '@id': profileUrl,
      name: attorney.title,
      image: attorney.better_featured_image,
      url: profileUrl,
      telephone: attorney.phone?.trim(),
      jobTitle: 'Attorney',
      worksFor: {
        '@type': 'LegalService',
        '@id': `${CURRENT_DOMAIN}/#organization`,
      },
    };
  });

  const canonicalUrl = `${PRODUCTION_URL}/location/${slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Locations', url: `${CURRENT_DOMAIN}/location` },
    { name: currentOffice.title },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: currentOffice.seo?.title,
    description: currentOffice.seo?.metaDesc,
    pageType: 'WebPage',
    mainEntity: { '@id': `${canonicalUrl}/#legalservice` },
  };

  const stateAreaServed = {
    NJ: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
    ],
    NY: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
    ],
    DC: [{ '@type': 'AdministrativeArea', name: 'Washington, D.C.' }],
  };

  const locationSeo = {
    url: canonicalUrl,
    name: `${SITE_TITLE} - ${currentOffice.title}`,
    telephone: currentOffice.phone,
    faxNumber: currentOffice.fax,
    streetAddress: currentOffice.floor
      ? `${currentOffice.streetAddress}, ${currentOffice.floor}`
      : currentOffice.streetAddress,
    addressLocality: currentOffice.addressLocality,
    addressRegion: currentOffice.addressRegion,
    postalCode: currentOffice.postCode,
    image: currentOffice.featuredImage,
    mapAddress: currentOffice.mapAddress,
    ...(currentOffice.latitude && { latitude: currentOffice.latitude }),
    ...(currentOffice.longitude && { longitude: currentOffice.longitude }),
    areaServed: stateAreaServed[currentOffice.addressRegion] || [],
  };

  return {
    props: {
      offices: offices || {},
      seo: currentOffice.seo || {},
      currentOffice,
      attorneysSchemaData: attorneysSchema,
      posts: postsData?.posts || [],
      canonicalUrl,
      practices,
      breadcrumbs,
      webPageData,
      locationSeo,
      pageSchemaJsonLd,
    },
    revalidate: 600,
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
  breadcrumbs,
  locationSeo,
  webPageData,
  pageSchemaJsonLd,
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
    breadcrumbs,
    webPageData,
    locationSeo,
    pageSchemaJsonLd,
  };

  return <LocationPage {...locationProps} />;
};

export default SingleLocation;
