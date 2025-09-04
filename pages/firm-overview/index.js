import FirmOverviewPage from 'components/pages/FirmOverview';
import { SITE_PHONE, PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import { firmOverviewQuery } from 'requests/graphql-queries';
import empty from 'is-empty';

/** Fetch the firm overview page content WP GRAPHQL API */
export async function getFirmOverviewContent() {
  const data = await fetchAPI(firmOverviewQuery);
  return data?.pageBy;
}

const sanitizeMembers = (members) => members.map((member) => ({
  title: member.title,
  uri: member.attorneyMainInformation
    ? `attorneys/${member.slug}`
    : `administration/${member.slug}`,
  better_featured_image:
      member.attorneyMainInformation?.profileImage?.sourceUrl
      || member.administration?.featuredImage?.sourceUrl,
  phone:
      member.attorneyMainInformation?.phoneNumber
      || `${SITE_PHONE} #${member.administration?.phoneExtension}`,
  email:
      member.attorneyMainInformation?.email || member.administration?.email,
  designation:
      member?.attorneyChairCoChair
      || member?.attorneyMainInformation?.designation
      || member?.administration?.title,
  location_array: !empty(
    member.attorneyPrimaryRelatedPracticesLocationsGroups,
  )
    ? member.attorneyPrimaryRelatedPracticesLocationsGroups?.officeLocation?.map(
      ({ id, title }) => ({
        id,
        officeMainInformation: title,
      }),
    )
    : !empty(member.administration)
      ? member.administration?.location?.map(({ id, title }) => ({
        id,
        officeMainInformation: title,
      }))
      : [],
}));

export const getStaticProps = async () => {
  const pageRequest = await getFirmOverviewContent();

  const {
    title, seo, pagesFields, firmOverviewTabs, featuredImage,
  } = pageRequest;

  const { directors, firmLeaders } = firmOverviewTabs;

  const firmOverViewTitles = [
    { name: 'Firm management', attorneys: firmLeaders },
    { name: 'Directors', attorneys: directors },
  ];

  const firmMembers = firmOverViewTitles?.reduce((acc, { name, attorneys }) => {
    acc[name] = { attorneys: sanitizeMembers(attorneys) };
    return acc;
  }, {});

  return {
    props: {
      title,
      seo,
      description: pagesFields?.description,
      sections: pagesFields?.sections,
      firmOverviewTabs,
      firmMembers: firmMembers || {},
      subHeaderImage: featuredImage.node.sourceUrl,
    },
    revalidate: 600,
  };
};

/** The Firm Overview page component */
const FirmOverview = ({
  title,
  seo,
  description,
  sections,
  firmOverviewTabs,
  firmMembers,
  subHeaderImage,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/firm-overview`;

  const firmOverviewProps = {
    title,
    seo,
    canonicalUrl,
    sections,
    description,
    firmOverviewTabs,
    firmMembers,
    subHeaderImage,
  };

  return <FirmOverviewPage {...firmOverviewProps} />;
};

export default FirmOverview;
