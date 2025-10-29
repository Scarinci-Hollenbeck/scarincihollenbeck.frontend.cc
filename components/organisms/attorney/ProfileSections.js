import ProfileSection from 'components/molecules/attorney/ProfileSection';
import dynamic from 'next/dynamic';
import React from 'react';
import { ProfileSectionsStyled } from 'styles/attorney-page/ProfileSections.style';
import empty from 'is-empty';

const AwardsSlider = dynamic(() => import('components/molecules/home/AwardsSlider'));
const ProfileRepresentatives = dynamic(() => import('components/molecules/attorney/ProfileRepresentatives'));
const ProfileClients = dynamic(() => import('components/molecules/attorney/ProfileClients'));

const breakpointsAwards = {
  1440: {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  992: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  0: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
};

const ProfileSections = (props) => {
  const {
    attorneyBiographyTitle,
    attorneyBiography,
    awards,
    representativeMatters,
    clientsImages,
    clientsList,
    additionalTabs,
  } = props;

  return (
    <ProfileSectionsStyled>
      <ProfileSection
        title={attorneyBiographyTitle}
        content={attorneyBiography}
      />

      {(!empty(clientsImages) || !empty(clientsList)) && (
        <ProfileSection title="Clients">
          <ProfileClients clients={{ clientsImages, clientsList }} />
        </ProfileSection>
      )}

      {!empty(awards) && (
        <ProfileSection
          title="Awards"
          link={{ text: 'Award Methodology', href: '/awards' }}
        >
          <AwardsSlider
            items={awards}
            breakpoints={breakpointsAwards}
            isLightVariant
          />
        </ProfileSection>
      )}

      {!empty(representativeMatters) && (
        <ProfileSection
          title="Representative Matters"
          disclaimer="* Results may vary depending on your particular facts and legal circumstances."
        >
          <ProfileRepresentatives
            representativeMatters={representativeMatters}
          />
        </ProfileSection>
      )}

      {!empty(additionalTabs)
        && additionalTabs.map(
          (tab) => !empty(tab?.content) && (
          <ProfileSection
            key={`${tab?.id}-additional-section`}
            title={tab?.title}
            content={tab?.content}
          />
          ),
        )}
    </ProfileSectionsStyled>
  );
};

export default ProfileSections;
