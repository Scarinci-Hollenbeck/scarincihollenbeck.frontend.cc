import React from 'react';
import ProfileContacts from 'components/molecules/attorney/ProfileContacts';
import ProfileImage from 'components/molecules/attorney/ProfileImage';
import {
  ProfileHeaderActions,
  ProfileHeaderButtons,
  ProfileHeaderDesignation,
  ProfileHeaderHolder,
  ProfileHeaderLeft,
  ProfileHeaderSection,
  ProfileHeaderTop,
  ProfileHeaderTitle,
  ProfileHeaderWhiteButtons,
} from 'styles/attorney-page/ProfileHeader.style';
import { ContainerDefault } from 'styles/Containers.style';
import PDFIcon from 'components/common/icons/PDFIcon';
import BusinessCard from 'components/common/icons/BusinessCard';
import Link from 'next/link';
import ProfileServices from 'components/molecules/attorney/ProfileServices';
import empty from 'is-empty';
import WhiteButton from 'components/molecules/attorney/WhiteButton';
import { Title32 } from 'styles/common/Typography.style';
import ContactModalOpener from 'components/atoms/ContactModalOpener';
import BreadCrumbs from '../common/BreadCrumbs';

const ProfileHeader = (props) => {
  const {
    name,
    profileImage,
    designation,
    offices,
    coChairs,
    chairs,
    contact,
    representativeVideo,
    profilePractices,
    isAdmin = false,
    handlePrint,
  } = props;

  const profileContactsProps = {
    offices,
    contact,
  };

  return (
    <ProfileHeaderSection>
      <ContainerDefault>
        <BreadCrumbs />
        <ProfileHeaderHolder>
          <ProfileHeaderLeft>
            <ProfileImage
              name={name}
              profileImage={profileImage}
              representativeVideo={representativeVideo}
            />
          </ProfileHeaderLeft>

          <ProfileHeaderTop>
            <ProfileHeaderTitle>
              <Title32 as="h1">{name}</Title32>
              <ProfileHeaderDesignation>{designation}</ProfileHeaderDesignation>
            </ProfileHeaderTitle>

            <ProfileServices
              coChairs={coChairs}
              chairs={chairs}
              profilePractices={profilePractices}
            />
          </ProfileHeaderTop>

          <ProfileHeaderActions>
            <ProfileContacts {...profileContactsProps} />

            <ProfileHeaderButtons>
              <ProfileHeaderWhiteButtons>
                {!isAdmin && (
                  <WhiteButton
                    key={`print-bio-button-${name}`}
                    onClick={handlePrint}
                    text="Print Bio"
                    icon={<PDFIcon />}
                  />
                )}

                {!empty(contact?.vizibility) && (
                  <WhiteButton
                    as={Link}
                    rel="noopener noreferrer"
                    target="_blank"
                    href={contact?.vizibility}
                    text="Business Card"
                    icon={<BusinessCard />}
                  />
                )}
              </ProfileHeaderWhiteButtons>

              <ContactModalOpener>Contact now</ContactModalOpener>
            </ProfileHeaderButtons>
          </ProfileHeaderActions>
        </ProfileHeaderHolder>
      </ContainerDefault>
    </ProfileHeaderSection>
  );
};

export default ProfileHeader;
