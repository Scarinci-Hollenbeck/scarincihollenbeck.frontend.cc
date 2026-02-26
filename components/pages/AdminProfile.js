import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import {
  ProfileContentContainer,
  ProfileContentSection,
} from 'styles/attorney-page/ProfileContent.style';
import { ContainerDefault } from 'styles/Containers.style';
import ProfileSection from 'components/molecules/attorney/ProfileSection';

const AdminProfile = ({
  seo, profile, canonicalUrl, breadcrumbs,
}) => (
  <>
    <PersonSiteHead
      title={seo.title}
      metaDescription={seo.metaDescription}
      canonicalUrl={canonicalUrl}
      name={profile.name}
      featuredImage={profile.profileImage}
      designation={profile.designation}
      email={profile.contact?.email}
      telephone={profile.contact?.phoneNumber}
      socialMediaLinks={profile.contact?.socialMediaLinks}
      breadcrumbs={breadcrumbs}
    />
    <ProfileHeader {...profile} />

    <ProfileContentSection>
      <ContainerDefault>
        <ProfileContentContainer>
          <ProfileSection title="Biography" content={profile.biography} />
        </ProfileContentContainer>
      </ContainerDefault>
    </ProfileContentSection>
  </>
);

export default AdminProfile;
