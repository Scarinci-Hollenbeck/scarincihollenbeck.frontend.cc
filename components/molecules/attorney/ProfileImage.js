import empty from 'is-empty';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ProfileImageContainer,
  ProfileImageWrapper,
  ProfileImageBg,
  ProfileImageButtons,
} from '../../../styles/attorney-page/ProfileImage.style';

const ProfileRepresentativeVideo = dynamic(() => import('./ProfileRepresentativeVideo'));

const ProfileImage = ({ name, profileImage, representativeVideo }) => (
  <>
    <ProfileImageContainer>
      <ProfileImageWrapper>
        <Image
          key={profileImage}
          src={profileImage}
          alt={name || 'Profile avatar'}
          width={500}
          height={535}
          quality={85}
          sizes="(max-width: 992px) 360px, (max-width: 1680px) 400px, 500px"
          className="animate__animated animate__fadeInUp animate__fast"
          priority
        />
      </ProfileImageWrapper>

      {!empty(representativeVideo) && (
        <ProfileImageButtons>
          <ProfileRepresentativeVideo
            representativeVideo={representativeVideo}
          />
        </ProfileImageButtons>
      )}
    </ProfileImageContainer>

    <ProfileImageBg
      src="/images/profile-attorney-bg.webp"
      width={700}
      height={900}
      alt="Profile background"
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1680px) 480px, 700px"
      loading="eager"
    />
  </>
);

export default ProfileImage;
