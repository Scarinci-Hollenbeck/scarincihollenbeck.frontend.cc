import empty from 'is-empty';
import dynamic from 'next/dynamic';

const YouTubeEmbed = dynamic(() => import('@next/third-parties/google').then((mod) => mod.YouTubeEmbed));

const extractYouTubeID = (url) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = typeof url === 'string' && url.match(regex);
  return match ? match[1] : null;
};

export const videoRender = (video, videoRef, youtubeSizes) => {
  const youtubeID = extractYouTubeID(video);

  if (!empty(youtubeID)) {
    return (
      <YouTubeEmbed
        videoid={youtubeID}
        height={youtubeSizes?.height}
        width={youtubeSizes?.width}
      />
    );
  }

  return (
    <video preload="metadata" controls ref={videoRef}>
      <source type={video?.type} src={video?.src} />
      <track kind="captions" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
};
