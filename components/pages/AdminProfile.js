import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import { ProfileContentSection } from 'styles/attorney-page/ProfileContent.style';
import { ContainerDefault } from 'styles/Containers.style';
import ProfileSection from 'components/molecules/attorney/ProfileSection';

const AdminProfile = ({ seo, profile, canonicalUrl }) => (
  <>
    <PersonSiteHead
      title={seo.title}
      metaDescription={seo.metaDescription}
      canonicalUrl={canonicalUrl}
      name={profile.name}
      featuredImage={profile.profileImage}
      designation={profile.designation}
    />
    <ProfileHeader {...profile} />

    <ProfileContentSection>
      <ContainerDefault>
        <ProfileSection title="Biography" content={profile.biography} />
      </ContainerDefault>
    </ProfileContentSection>
  </>
);

export default AdminProfile;
