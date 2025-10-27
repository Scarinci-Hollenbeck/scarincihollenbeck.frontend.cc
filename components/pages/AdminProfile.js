import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import ProfileHeader from 'components/organisms/attorney/ProfileHeader';
import {
  ProfileContentContainer,
  ProfileContentSection,
} from 'styles/attorney-page/ProfileContent.style';
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
        <ProfileContentContainer>
          <ProfileSection title="Biography" content={profile.biography} />
        </ProfileContentContainer>
      </ContainerDefault>
    </ProfileContentSection>
  </>
);

export default AdminProfile;
