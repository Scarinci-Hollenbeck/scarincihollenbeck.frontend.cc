import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import { CURRENT_DOMAIN } from 'utils/constants';
import usePrintLogic from 'hooks/usePrintLogic';
import ProfileContent from 'components/organisms/attorney/ProfileContent';
import ProfileMedia from 'components/organisms/attorney/ProfileMedia';
// import AttorneyPrintPage from './AttorneyPrintPage';

const AttorneyProfilePage = (props) => {
  const {
    seo, profileHeader, profileContent, asideItems, profileMedia,
  } = props;

  const printPageProps = {
    ...profileHeader,
  };

  const { isRenderPdf, setIsPrintReady, handlePrint } = usePrintLogic();

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
      <ProfileHeader handlePrint={handlePrint} {...profileHeader} />

      <ProfileContent profileContent={profileContent} asideItems={asideItems} />

      <ProfileMedia {...profileMedia} />

      {isRenderPdf && (
        <span>Print coming soon</span>
        // <AttorneyPrintPage
        //   {...printPageProps}
        //   onReady={() => setIsPrintReady(true)}
        // />
      )}
    </>
  );
};

export default AttorneyProfilePage;
