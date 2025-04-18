import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import empty from 'is-empty';
import Image from 'next/image';
import VideoIcon from 'components/common/icons/VideoIcon';
import QuestionAnswerIcon from 'components/common/icons/QuestionAnswerIcon';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { videoRender } from 'utils/videoRender';
import {
  CardImageVideoContainer,
  CardImageWrapper,
  CardVideoWrapper,
  ProfileImageButtons,
} from '../../../styles/attorney-page/AttorneyProfile.style';

const ProfileImageButton = dynamic(() => import('./ProfileImageButton'));
const ModalWindow = dynamic(() => import('components/common/ModalWindow'));

const ProfileImage = ({
  name,
  profileImage,
  representativeVideo,
  isLawyerSpotlight = false,
  setActiveAccordion,
}) => {
  const videoRef = useRef(null);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoData = typeof representativeVideo === 'string'
    ? representativeVideo
    : {
      type: representativeVideo?.mimeType,
      src: representativeVideo?.mediaItemUrl,
    };

  const stopVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [videoRef]);

  useEffect(() => {
    if (isShowVideo && videoRef.current) {
      videoRef.current.play();
    } else {
      stopVideo();
    }
  }, [isShowVideo]);

  const handleClickVideoOpener = useCallback(() => {
    setIsShowVideo(true);
  }, [setIsShowVideo]);

  return (
    <CardImageVideoContainer>
      <CardImageWrapper>
        <Image
          key={profileImage}
          src={profileImage}
          alt={name || 'Profile avatar'}
          width={500}
          height={535}
          quality={100}
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 324px, (max-width: 1680px) 400px, 500px"
          className="animate__animated animate__fadeInUp animate__fast"
          priority
          loading="eager"
        />
      </CardImageWrapper>
      {!empty(representativeVideo) && (
        <ModalWindow isOpen={isShowVideo} setOpenModal={setIsShowVideo}>
          <CardVideoWrapper>
            {videoRender(videoData, videoRef)}
          </CardVideoWrapper>
        </ModalWindow>
      )}

      {(!empty(representativeVideo) || isLawyerSpotlight) && (
        <ProfileImageButtons>
          {isLawyerSpotlight && (
            <div className="animate__animated animate__fadeInUp animate__slow">
              <ProfileImageButton
                title="Lawyer Spotlight heading"
                icon={<QuestionAnswerIcon />}
                as={Link}
                href="#lawyer-spotlight"
                onClick={() => !empty(setActiveAccordion)
                  && setActiveAccordion((prev) => (prev.includes(`lawyer-spotlight-${name}`)
                    ? prev
                    : [...prev, `lawyer-spotlight-${name}`]))}
              />
            </div>
          )}
          {!empty(representativeVideo) && (
            <div className="animate__animated animate__fadeInUp animate__slow">
              <ProfileImageButton
                isShowVideo={isShowVideo}
                onButtonClick={handleClickVideoOpener}
                icon={<VideoIcon />}
                title="My representative video"
              />
            </div>
          )}
        </ProfileImageButtons>
      )}
    </CardImageVideoContainer>
  );
};

export default ProfileImage;
