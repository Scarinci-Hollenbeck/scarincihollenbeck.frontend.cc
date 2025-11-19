import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import { CURRENT_DOMAIN } from 'utils/constants';
import ProfileContent from 'components/organisms/attorney/ProfileContent';
import ProfileMedia from 'components/organisms/attorney/ProfileMedia';
import ProfilePrint from 'components/organisms/attorney/ProfilePrint';
import usePrintLogic from 'hooks/usePrintLogic';
import LibraryQuestionBanner from 'components/organisms/library/LibraryQuestionBanner';
import { useGetLocationsQuery } from '../../redux/services/project-api';

const AttorneyProfilePage = (props) => {
  const {
    seo, profileHeader, profileContent, asideItems, profileMedia,
  } = props;

  const { data: locations } = useGetLocationsQuery();
  const { isRenderPdf, handlePrint, setIsPrintReady } = usePrintLogic();

  const printPageProps = {
    ...profileHeader,
    ...profileContent,
    asideItems,
    locations,
  };

  return (
    <>
      <PersonSiteHead
        title={seo.title}
        metaDescription={seo.metaDescription}
        canonicalUrl={`${CURRENT_DOMAIN}/${seo.canonicalLink}`}
        name={profileHeader.name}
        featuredImage={seo.image}
        designation={profileHeader.designation}
        socialMediaLinks={seo.socialMediaLinks}
      />
      <ProfileHeader
        handlePrint={handlePrint}
        isLawyerSpotlight={profileMedia?.isLawyerSpotlight}
        {...profileHeader}
      />

      <ProfileContent profileContent={profileContent} asideItems={asideItems} />

      <ProfileMedia {...profileMedia} />

      <LibraryQuestionBanner />

      <ProfilePrint
        isRenderPdf={isRenderPdf}
        setIsPrintReady={setIsPrintReady}
        printData={printPageProps}
      />
    </>
  );
};

export default AttorneyProfilePage;
