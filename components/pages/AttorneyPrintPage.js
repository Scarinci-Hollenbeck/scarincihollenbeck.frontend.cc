import empty from 'is-empty';
import { Title32, Title20 } from 'styles/common/Typography.style';
import { useImagesLoad } from 'hooks/useImagesLoad';
import { useRef } from 'react';
import { PrintContainer } from 'styles/common/PrintStyles.style';
import AwardsPrint from 'components/organisms/practices/AwardsPrint';
import ProfileAside from 'components/molecules/attorney/ProfileAside';
import {
  ProfileHeaderDesignation,
  ProfileHeaderTitle,
} from 'styles/attorney-page/ProfileHeader.style';
import ProfileClients from 'components/molecules/attorney/ProfileClients';
import ProfileRepresentatives from 'components/molecules/attorney/ProfileRepresentatives';
import {
  BioPrintPageContainer,
  InfoPrintBox,
  BioPrintPageImage,
  BioPrintPageHeaderRight,
  BioPrintPageContent,
} from '../../styles/attorney-page/AttorneyPrintPage.style';
import ProfileServices from '../molecules/attorney/ProfileServices';
import ProfileContacts from '../molecules/attorney/ProfileContacts';
import { JSXWithDynamicLinks } from '../atoms/micro-templates/JSXWithDynamicLinks';
import FooterPrintVersion from '../shared/Footer/FooterPrintVersion';

const AttorneyPrintPage = ({
  name,
  profileImage,
  designation,
  offices,
  coChairs,
  chairs,
  contact,
  profilePractices,
  attorneyBiography,
  awards,
  asideItems,
  clientsList,
  representativeMatters,
  qrCodeBioPage,
  qrCodeLinkedin,
  onReady,
  locations,
}) => {
  const containerRef = useRef();
  useImagesLoad(onReady, containerRef);

  const profileContactsProps = {
    offices,
    contact,
    qrCodeLinkedin,
    qrCodeBioPage,
  };

  return (
    <PrintContainer ref={containerRef}>
      <BioPrintPageContainer>
        <div className="wrapper-pdf">
          <BioPrintPageImage>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImage || '/images/sh-mini-diamond-PNG.svg'}
              alt={name}
              width={356}
              height={356}
              // eslint-disable-next-line react/no-unknown-property
              quality={100}
            />
          </BioPrintPageImage>
          <BioPrintPageHeaderRight>
            <ProfileHeaderTitle className="profile-title">
              <Title32 as="h1">{name}</Title32>
              <ProfileHeaderDesignation>{designation}</ProfileHeaderDesignation>
            </ProfileHeaderTitle>
            <ProfileServices
              coChairs={coChairs}
              chairs={chairs}
              profilePractices={profilePractices}
            />
          </BioPrintPageHeaderRight>
        </div>
        <div className="bio-list-info-boxes">
          <ProfileContacts {...profileContactsProps} />

          <ProfileAside {...asideItems} />
        </div>
        <AwardsPrint awards={awards} />
        {!empty(attorneyBiography) && (
          <div>
            <Title20>Full Biography</Title20>
            <InfoPrintBox>
              <JSXWithDynamicLinks HTML={attorneyBiography} />
            </InfoPrintBox>
          </div>
        )}
        {!empty(clientsList) && (
          <div>
            <Title20>Clients</Title20>

            <BioPrintPageContent className="print-pdf-clients">
              <ProfileClients clients={{ clientsList }} />
            </BioPrintPageContent>
          </div>
        )}
        {!empty(representativeMatters) && (
          <div>
            <Title20>Representative Matters</Title20>
            <ProfileRepresentatives
              representativeMatters={representativeMatters}
              isPrint
            />
          </div>
        )}
        <FooterPrintVersion locations={locations} />
      </BioPrintPageContainer>
    </PrintContainer>
  );
};

export default AttorneyPrintPage;
