import AdminProfile from 'components/pages/AdminProfile';
import { CURRENT_DOMAIN, SITE_PHONE } from 'utils/constants';
import { concatNameUser } from 'utils/helpers';
import empty from 'is-empty';
import { fetchAPI } from '../../requests/api';
import { administrationPersoneQuery } from '../../requests/graphql-queries';

const adminsSlugsQuery = `
query attorneysSlugs {
  administrations(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

const getAdminData = async (slug) => {
  const data = await fetchAPI(administrationPersoneQuery, {
    variables: {
      id: slug,
    },
  });
  const administration = data?.administration?.administration;
  const seo = data?.administration?.seo;

  if (empty(administration) || data?.administration?.status !== 'publish') {
    return undefined;
  }

  return {
    profile: {
      name: concatNameUser(administration.name, administration.abbreviation),
      biography: administration.biography,
      profileImage: administration.featuredImage.sourceUrl,
      title: administration.designation,
      contact: {
        email: administration.email,
        phoneNumber: `${SITE_PHONE} ${administration.phoneExtension}`,
        vizibility: administration.vizibility,
        socialMediaLinks: administration.socialMediaLinks,
      },
      offices: administration.location.map(({ id, uri, title }) => ({
        id,
        uri,
        name: title,
      })),
      isAdmin: true,
    },
    seo: {
      canonicalLink: `${CURRENT_DOMAIN}/administration/${slug}`,
      metaDescription: seo.metaDesc,
      title: seo.title,
    },
  };
};

export async function getStaticPaths() {
  const listId = await fetchAPI(adminsSlugsQuery);

  const paths = [];

  listId.administrations.nodes.forEach((node) => {
    paths.push(`/administration/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

/** Set data from API response to page props */
export const getStaticProps = async ({ params }) => {
  const dataAdmin = await getAdminData(params?.slug);

  if (!dataAdmin) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dataAdmin,
    },
    revalidate: 600,
  };
};

/** Administration profile component */
const AdministrationProfile = ({ dataAdmin }) => {
  const adminProps = {
    seo: dataAdmin.seo,
    profile: dataAdmin.profile,
    canonicalUrl: dataAdmin.seo.canonicalLink,
  };

  return <AdminProfile {...adminProps} />;
};

export default AdministrationProfile;
