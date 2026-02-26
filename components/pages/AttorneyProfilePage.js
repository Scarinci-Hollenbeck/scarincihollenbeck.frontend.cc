import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import { CURRENT_DOMAIN } from 'utils/constants';
import ProfileContent from 'components/organisms/attorney/ProfileContent';
import ProfileMedia from 'components/organisms/attorney/ProfileMedia';
import ProfilePrint from 'components/organisms/attorney/ProfilePrint';
import usePrintLogic from 'hooks/usePrintLogic';
import { useGetLocationsQuery } from '../../redux/services/project-api';

const AttorneyProfilePage = (props) => {
  const {
    seo,
    profileHeader,
    profileContent,
    asideItems,
    profileMedia,
    breadcrumbs,
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
        breadcrumbs={breadcrumbs}
        email={seo.email}
        telephone={seo.telephone}
        knowsAbout={seo.knowsAbout}
        alumniOf={seo.alumniOf}
        barAdmissions={seo.barAdmissions}
        affiliations={seo.affiliations}
        awards={seo.awards}
      />
      <ProfileHeader handlePrint={handlePrint} {...profileHeader} />

      <ProfileContent profileContent={profileContent} asideItems={asideItems} />

      <ProfileMedia {...profileMedia} />

      <ProfilePrint
        isRenderPdf={isRenderPdf}
        setIsPrintReady={setIsPrintReady}
        printData={printPageProps}
      />
    </>
  );
};

export default AttorneyProfilePage;
