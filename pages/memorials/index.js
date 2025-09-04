import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  memorialsPageContentQuery,
  memorialsQuery,
} from 'requests/graphql-queries';
import MemorialsPage from 'components/pages/MemorialsPage';

export async function getStaticProps() {
  const {
    pageBy: {
      title, seo, pagesFields, featuredImage,
    },
  } = await fetchAPI(memorialsPageContentQuery);
  const { memorials } = await fetchAPI(memorialsQuery);

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      image: featuredImage?.node?.sourceUrl || null,
      memorials: memorials?.nodes,
    },
    revalidate: 600,
  };
}

const Memorials = ({
  seo, title, description, image, memorials,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/memorials`;

  const memorialsProps = {
    seo,
    title,
    description,
    image,
    memorials,
    canonicalUrl,
  };
  return <MemorialsPage {...memorialsProps} />;
};

export default Memorials;
