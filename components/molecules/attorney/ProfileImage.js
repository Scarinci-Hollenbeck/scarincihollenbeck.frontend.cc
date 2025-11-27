import empty from 'is-empty';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import QuestionAnswerIcon from 'components/common/icons/QuestionAnswerIcon';
import Link from 'next/link';
import {
  ProfileImageContainer,
  ProfileImageWrapper,
  ProfileImageBg,
  ProfileImageButtons,
} from '../../../styles/attorney-page/ProfileImage.style';
import ProfileImageButton from './ProfileImageButton';

const ProfileRepresentativeVideo = dynamic(() => import('./ProfileRepresentativeVideo'));

const ProfileImage = ({
  name,
  profileImage,
  representativeVideo,
  isAttorneySpotlight = false,
}) => (
  <>
    <ProfileImageContainer>
      <ProfileImageWrapper>
        <Image
          key={profileImage}
          src={profileImage}
          alt={name || 'Profile avatar'}
          width={500}
          height={535}
          quality={100}
          sizes="(max-width: 992px) 360px, (max-width: 1680px) 400px, 500px"
          className="animate__animated animate__fadeInUp animate__fast"
          priority
          loading="eager"
        />
      </ProfileImageWrapper>

      {(!empty(representativeVideo) || isAttorneySpotlight) && (
        <ProfileImageButtons>
          {isAttorneySpotlight && (
            <div className="animate__animated animate__fadeInUp animate__slow">
              <ProfileImageButton
                title="Attorney Spotlight heading"
                icon={<QuestionAnswerIcon />}
                as={Link}
                href="#attorney-spotlight"
              />
            </div>
          )}
          {!empty(representativeVideo) && (
            <ProfileRepresentativeVideo
              representativeVideo={representativeVideo}
            />
          )}
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
