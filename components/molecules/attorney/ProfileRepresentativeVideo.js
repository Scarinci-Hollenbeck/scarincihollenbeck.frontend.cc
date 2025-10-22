import { useEffect, useRef, useState } from 'react';
import empty from 'is-empty';
import { videoRender } from 'utils/videoRender';
import VideoIcon from 'components/common/icons/VideoIcon';
import dynamic from 'next/dynamic';
import { ProfileImageVideoWrapper } from '../../../styles/attorney-page/ProfileImage.style';
import ProfileImageButton from './ProfileImageButton';

const ModalWindow = dynamic(() => import('components/common/ModalWindow'));

const ProfileRepresentativeVideo = ({ representativeVideo }) => {
  const videoRef = useRef(null);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoData = typeof representativeVideo === 'string'
    ? representativeVideo
    : {
      type: representativeVideo?.mimeType,
      src: representativeVideo?.mediaItemUrl,
    };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isShowVideo && videoRef.current) {
      videoRef.current.play();
    } else {
      stopVideo();
    }
  }, [isShowVideo]);

  const handleClickVideoOpener = () => {
    setIsShowVideo(true);
  };

  if (empty(representativeVideo)) return null;

  return (
    <>
      <ModalWindow isOpen={isShowVideo} setOpenModal={setIsShowVideo}>
        <ProfileImageVideoWrapper>
          {videoRender(videoData, videoRef)}
        </ProfileImageVideoWrapper>
      </ModalWindow>

      <div className="animate__animated animate__fadeInUp animate__slow">
        <ProfileImageButton
          isShowVideo={isShowVideo}
          onButtonClick={handleClickVideoOpener}
          icon={<VideoIcon />}
          title="My representative video"
        />
      </div>
    </>
  );
};

export default ProfileRepresentativeVideo;
