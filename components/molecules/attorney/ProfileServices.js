import Link from 'next/link';
import {
  ProfileServicesChair,
  ProfileServicesChairItem,
  ProfileServicesChairList,
  ProfileServicesChairTitle,
  ProfileServicesContent,
  ProfileServicesItem,
  ProfileServicesTitle,
  ProfileServicesWrapper,
} from 'styles/attorney-page/ProfileServices.style';
import empty from 'is-empty';

const ProfileServices = ({ profilePractices, coChairs, chairs }) => {
  if (empty(profilePractices)) return null;

  return (
    <ProfileServicesWrapper className="profile-services-wrapper">
      <ProfileServicesTitle indent="true">How I can help</ProfileServicesTitle>

      <ProfileServicesContent>
        {!empty(chairs) && (
          <ProfileServicesChair as="li" className="chair">
            <ProfileServicesChairTitle>Chair</ProfileServicesChairTitle>

            <ProfileServicesChairList>
              {chairs.map((chair) => (
                <ProfileServicesChairItem key={chair.title}>
                  <Link href={chair.link}>{chair.title}</Link>
                </ProfileServicesChairItem>
              ))}
            </ProfileServicesChairList>
          </ProfileServicesChair>
        )}

        {!empty(coChairs) && (
          <ProfileServicesChair as="li" className="co-chair">
            <ProfileServicesChairTitle>co-CHAIR</ProfileServicesChairTitle>

            <ProfileServicesChairList>
              {coChairs.map((chair) => (
                <ProfileServicesChairItem key={chair.title}>
                  <Link href={chair.link}>{chair.title}</Link>
                </ProfileServicesChairItem>
              ))}
            </ProfileServicesChairList>
          </ProfileServicesChair>
        )}

        {profilePractices.map((service) => (
          <ProfileServicesItem key={service.title}>
            <Link href={service.uri}>{service.title}</Link>
          </ProfileServicesItem>
        ))}
      </ProfileServicesContent>
    </ProfileServicesWrapper>
  );
};

export default ProfileServices;
