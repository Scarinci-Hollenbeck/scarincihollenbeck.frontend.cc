import ProfileSection from 'components/molecules/attorney/ProfileSection';
import dynamic from 'next/dynamic';
import React from 'react';
import { ProfileSectionsStyled } from 'styles/attorney-page/ProfileSections.style';
import empty from 'is-empty';

const AwardsSlider = dynamic(() => import('components/molecules/home/AwardsSlider'));
const ProfileRepresentative = dynamic(() => import('components/molecules/attorney/ProfileRepresentative'));
const ClientSlider = dynamic(() => import('components/molecules/attorney/ClientSlider'));

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
    clients,
    additionalTabs,
  } = props;

  return (
    <ProfileSectionsStyled>
      <ProfileSection
        title={attorneyBiographyTitle || 'Biography'}
        content={attorneyBiography}
      />

      {!empty(clients) && (
        <ProfileSection title="Clients">
          <ClientSlider clients={clients} />
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
          {representativeMatters.map((item, index) => (
            <ProfileRepresentative
              key={`${item?.title}-${index + 1}`}
              title={
                representativeMatters.length > 1 && !empty(item?.title)
                  ? `${index + 1}. ${item?.title}`
                  : item?.title
              }
              label={item?.label}
              content={item?.content}
            />
          ))}
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
