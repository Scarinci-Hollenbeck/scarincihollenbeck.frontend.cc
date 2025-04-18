import React, { useState, useEffect } from 'react';
import ProfileContacts from 'components/molecules/attorney/ProfileContacts';
import ProfileImage from 'components/molecules/attorney/ProfileImage';
import {
  ProfileActions,
  ProfileBgImage,
  ProfileBio,
  ProfileBioListItems,
  ProfileBioText,
  ProfileBioTitle,
  ProfileButtons,
  ProfileDesignation,
  ProfileHeaderHolder,
  ProfileHeaderLeft,
  ProfileHeaderRight,
  ProfileHeaderSection,
  ProfileTitle,
} from 'styles/attorney-page/AttorneyProfile.style';
import { ContainerDefault } from 'styles/Containers.style';
import PDFIcon from 'components/common/icons/PDFIcon';
import BusinessCard from 'components/common/icons/BusinessCard';
import Link from 'next/link';
import { StandardBlueButton } from 'styles/Buttons.style';
import ProfileServices from 'components/molecules/attorney/ProfileServices';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import empty from 'is-empty';
import WhiteButton from 'components/molecules/attorney/WhiteButton';
import ProfileBioList from 'components/molecules/attorney/ProfileBioList';
import { Title32 } from 'styles/common/Typography.style';
import { useDispatch } from 'react-redux';
import PostBreadCrumbs from '../post/PostBreadcrumbs';
import { handleModalOpener } from '../../../redux/slices/modals.slice';

export const useDesignationHook = (title) => {
  const [designation, setDesignation] = useState(title);
  useEffect(() => {
    if (title === 'Red Bank, NJ Managing Partner') {
      setDesignation('Red Bank, NJ  Office Managing Partner');
    }

    if (title === 'Managing Partner') {
      setDesignation('Firm Managing Partner');
    }

    if (title === 'Washington, D.C. Managing Partner') {
      setDesignation('Washington, D.C. Office Managing Partner');
    }
    setDesignation(title);
  }, [title]);

  return [designation, setDesignation];
};

const ProfileHeader = ({
  name,
  profileImage,
  title,
  offices,
  coChair: coChairs,
  chair: chairs,
  contact,
  representativeVideo,
  practices,
  attorneyBiography,
  education,
  barAdmissions,
  biography,
  affiliations,
  additionalInfo,
  isAdmin = false,
  handlePrint,
  bioTitle = 'Bio Overview',
  isLawyerSpotlight = false,
  setActiveAccordion,
}) => {
  const dispatch = useDispatch();
  const [designation] = useDesignationHook(title);
  const linkedIn = contact?.socialMediaLinks?.filter(
    (a) => a.channel === 'LinkedIn',
  )[0];

  const profileDetailsProps = {
    offices,
    fax: contact?.fax,
    contact,
    linkedIn,
  };

  return (
    <ProfileHeaderSection>
      <ContainerDefault>
        <PostBreadCrumbs />
        <ProfileHeaderHolder>
          <ProfileHeaderLeft>
            <ProfileImage
              name={name}
              profileImage={profileImage}
              representativeVideo={representativeVideo}
              isLawyerSpotlight={isLawyerSpotlight}
              setActiveAccordion={setActiveAccordion}
            />
            <ProfileBgImage
              src="/images/profile-attorney-bg.webp"
              width={700}
              height={900}
              alt="Profile background"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1680px) 480px, 700px"
              loading="eager"
            />

            <ProfileActions>
              <ProfileButtons>
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
              </ProfileButtons>

              <StandardBlueButton
                onClick={() => dispatch(handleModalOpener({ active: true }))}
              >
                Contact now
              </StandardBlueButton>

              <ProfileContacts {...profileDetailsProps} />
            </ProfileActions>
          </ProfileHeaderLeft>

          <ProfileHeaderRight>
            <ProfileTitle>
              <Title32 as="h1">{name}</Title32>
              <ProfileDesignation>{designation}</ProfileDesignation>
            </ProfileTitle>

            <ProfileServices
              coChairs={coChairs}
              chairs={chairs}
              services={practices}
            />

            {(!empty(attorneyBiography?.miniBio) || !empty(biography)) && (
              <ProfileBio>
                <ProfileBioTitle>{bioTitle}</ProfileBioTitle>
                <ProfileBioText as={!empty(biography) && 'div'}>
                  <JSXWithDynamicLinks
                    HTML={attorneyBiography?.miniBio || biography}
                  />
                </ProfileBioText>
              </ProfileBio>
            )}

            <ProfileBioListItems>
              {!empty(education) && (
                <ProfileBioList title="Education" content={education} />
              )}
              {!empty(barAdmissions) && (
                <ProfileBioList title="Admissions" content={barAdmissions} />
              )}
              {!empty(affiliations) && (
                <ProfileBioList title="Affiliations" content={affiliations} />
              )}
              {!empty(additionalInfo)
                && additionalInfo.map(
                  (item) => !empty(item?.content) && (
                  <ProfileBioList
                    key={`${item?.title}-additional-info`}
                    title={item?.title}
                    content={item?.content}
                  />
                  ),
                )}
            </ProfileBioListItems>
          </ProfileHeaderRight>
        </ProfileHeaderHolder>
      </ContainerDefault>
    </ProfileHeaderSection>
  );
};

export default ProfileHeader;
