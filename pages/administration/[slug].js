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
      designation: administration.designation,
      contact: {
        email: administration.email,
        phoneNumber: administration.phoneExtension
          ? `${SITE_PHONE} ext. ${administration.phoneExtension.replace(
            /^#/,
            '',
          )}`
          : SITE_PHONE,
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

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Administration', url: `${CURRENT_DOMAIN}/administration` },
    { name: dataAdmin.profile.name },
  ];

  return {
    props: {
      dataAdmin,
      breadcrumbs,
    },
    revalidate: 600,
  };
};

/** Administration profile component */
const AdministrationProfile = ({ dataAdmin, breadcrumbs }) => {
  const adminProps = {
    seo: dataAdmin.seo,
    profile: dataAdmin.profile,
    canonicalUrl: dataAdmin.seo.canonicalLink,
    breadcrumbs,
  };

  return <AdminProfile {...adminProps} />;
};

export default AdministrationProfile;
