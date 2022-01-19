import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import SiteLoader from 'components/shared/SiteLoader';
import LocationPage from 'components/pages/LocationPage';
import { LocationContext } from 'contexts/LocationContext';
import { getLocationContent } from 'utils/queries';
import { BASE_API_URL, headers } from 'utils/constants';

/** Fetch all the location pages urls from WP REST API * */
const getLocationPaths = async () => {
  const request = await fetch(`${BASE_API_URL}/wp-json/location-portal/offices`, {
    headers,
  })
    .then((data) => data.json())
    .catch((err) => err);

  const paths = request.offices.map((o) => o.slug);

  return paths;
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
  const [locations, currentOffice, currentOfficePosts] = await getLocationContent(params.slug);
  if (currentOffice.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      offices: locations.offices || {},
      seo: currentOffice.seo || {},
      currentOffice,
      posts: currentOfficePosts,
    },
    revalidate: 86400,
  };
};

/* Single location page component * */
const SingleLocation = ({
  seo, offices, currentOffice, posts,
}) => {
  const router = useRouter();
  const { locations, setLocations } = useContext(LocationContext);

  if (router.isFallback) {
    return <SiteLoader />;
  }

  useEffect(() => {
    if (!locations) {
      setLocations(offices);
    }
  }, [offices]);

  const locationProps = {
    seo,
    currentOffice,
    posts,
  };

  return <LocationPage {...locationProps} />;
};

export default SingleLocation;
