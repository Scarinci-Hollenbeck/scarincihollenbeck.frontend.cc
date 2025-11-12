import ProfileSection from 'components/molecules/attorney/ProfileSection';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  ProfileMediaItems,
  ProfileMediaSection,
} from 'styles/attorney-page/ProfileMedia.style';
import { ContainerDefault } from 'styles/Containers.style';
import empty from 'is-empty';
import DisclaimerText from 'components/atoms/DisclaimerText';

const MediaSlider = dynamic(() => import('components/molecules/attorney/MediaSlider'));
const GallerySlider = dynamic(() => import('components/molecules/attorney/GallerySlider'));
const ProfileArticles = dynamic(() => import('components/molecules/attorney/ProfileArticles'));

const ProfileMedia = (props) => {
  const {
    gallery,
    mediaItems,
    presentationsItems,
    publicationsItems,
    videos,
    govLawPosts,
    isArticlesAttorney,
    isNewsAttorney,
    authorId,
    attorneyId,
  } = props;

  return (
    <ProfileMediaSection>
      <ContainerDefault>
        <ProfileMediaItems>
          {isArticlesAttorney && (
            <ProfileArticles
              title="Articles"
              queryParams="articles-page"
              params={{
                authorId,
                attorneyId,
                categories: [599],
              }}
            />
          )}

          {isNewsAttorney && (
            <ProfileArticles
              title="The News"
              queryParams="news-page"
              params={{
                authorId,
                attorneyId,
                categories: [98, 99, 20098],
              }}
            />
          )}

          {!empty(mediaItems) && (
            <ProfileSection title="Media">
              <MediaSlider items={mediaItems} />
            </ProfileSection>
          )}

          {!empty(presentationsItems) && (
            <ProfileSection title="Presentations">
              <MediaSlider items={presentationsItems} />
            </ProfileSection>
          )}

          {!empty(videos) && (
            <ProfileSection title="Video">
              <MediaSlider items={videos} />
            </ProfileSection>
          )}

          {!empty(gallery) && (
            <ProfileSection title="Gallery">
              <GallerySlider items={gallery} />
            </ProfileSection>
          )}

          {!empty(publicationsItems) && (
            <ProfileSection title="Publications">
              <MediaSlider items={publicationsItems} />
            </ProfileSection>
          )}

          {!empty(govLawPosts?.posts) && (
            <ProfileSection title="Government & Law">
              <MediaSlider items={govLawPosts?.posts} />
            </ProfileSection>
          )}

          <DisclaimerText text="No Aspect of the advertisement has been approved by the Supreme Court. Results may vary depending on your particular facts and legal circumstances." />
        </ProfileMediaItems>
      </ContainerDefault>
    </ProfileMediaSection>
  );
};

export default ProfileMedia;
