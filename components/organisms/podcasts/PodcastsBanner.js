import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { StandardBlueButton } from 'styles/Buttons.style';
import { Title32 } from 'styles/common/Typography.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  PodcastsBannerContent,
  PodcastsBannerDescription,
  PodcastsBannerHolder,
  PodcastsBannerImage,
  PodcastsBannerSection,
} from 'styles/PodcastsBanner.style';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';
import PodcastsImage from '../../../public/images/podcasts-banner.svg';

const PodcastsBanner = () => {
  const dispatch = useDispatch();
  return (
    <PodcastsBannerSection>
      <ContainerDefault>
        <PodcastsBannerHolder>
          <PodcastsBannerImage>
            <Image
              src={PodcastsImage}
              alt="Microphone with radio wave"
              width={350}
              height={300}
              sizes="350px"
            />
          </PodcastsBannerImage>

          <PodcastsBannerContent>
            <Title32>It&apos;s empty here for now, but not for long!</Title32>

            <PodcastsBannerDescription>
              <p>
                We&apos;re already working on recording our first podcasts, and
                they&apos;ll be available to listen to soon.
              </p>
              <p>
                Subscribe to be the first to know about new episodes and get the
                latest updates!
              </p>
            </PodcastsBannerDescription>

            <StandardBlueButton
              onClick={() => dispatch(handleSubscriptionModalOpener({ active: true }))}
            >
              Subscribe now
            </StandardBlueButton>
          </PodcastsBannerContent>
        </PodcastsBannerHolder>
      </ContainerDefault>
    </PodcastsBannerSection>
  );
};

export default PodcastsBanner;
