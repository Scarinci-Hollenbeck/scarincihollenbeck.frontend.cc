import ProfileAccordion from 'components/organisms/attorney/ProfileAccordion';
import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import {
  ATTORNEY_ACCORDIONS_BLOGS_TITLES,
  CURRENT_DOMAIN,
} from 'utils/constants';
import usePrintLogic from 'hooks/usePrintLogic';
import { useState } from 'react';
import LibraryQuestionBanner from 'components/organisms/library/LibraryQuestionBanner';
import AttorneyPrintPage from './AttorneyPrintPage';
import { useGetLocationsQuery } from '../../redux/services/project-api';

const AttorneyProfilePage = ({
  seo,
  profileHeader,
  accordionData,
  qrCodeBioPage,
  qrCodeLinkedin,
}) => {
  const [activeAccordion, setActiveAccordion] = useState([]);
  const { data: locations } = useGetLocationsQuery();

  const printPageProps = {
    ...profileHeader,
    ...accordionData,
    qrCodeBioPage,
    qrCodeLinkedin,
    locations,
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
        designation={profileHeader.title}
        socialMediaLinks={seo.socialMediaLinks}
      />
      <ProfileHeader
        handlePrint={handlePrint}
        setActiveAccordion={setActiveAccordion}
        isLawyerSpotlight={accordionData?.blogTitles?.includes(
          ATTORNEY_ACCORDIONS_BLOGS_TITLES.lawyerSpotlight,
        )}
        {...profileHeader}
      />
      <ProfileAccordion
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        name={profileHeader?.name}
        {...accordionData}
      />

      <LibraryQuestionBanner />

      {isRenderPdf && (
        <AttorneyPrintPage
          {...printPageProps}
          onReady={() => setIsPrintReady(true)}
        />
      )}
    </>
  );
};

export default AttorneyProfilePage;
