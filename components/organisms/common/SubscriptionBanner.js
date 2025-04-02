import React from 'react';
import { StandardBlueButton } from 'styles/Buttons.style';
import { ContainerDefault } from 'styles/Containers.style';
import { useDispatch } from 'react-redux';
import {
  SubscriptionBannerContent,
  SubscriptionBannerDescription,
  SubscriptionBannerHolder,
  SubscriptionBannerSection,
  SubscriptionBannerSubtitle,
  SubscriptionBannerTitle,
} from 'styles/SubscriptionBanner.style';
import dynamic from 'next/dynamic';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';

const DynamicTitle32 = dynamic(() => import('styles/common/Typography.style').then((mod) => mod.Title32));

const SubscriptionBanner = ({
  isIndustry = false,
  TitleComponent = DynamicTitle32,
}) => {
  const dispatch = useDispatch();
  return (
    <SubscriptionBannerSection
      className={isIndustry ? 'subscription-industry' : ''}
    >
      <ContainerDefault>
        <SubscriptionBannerHolder>
          <SubscriptionBannerTitle as={TitleComponent}>
            <strong>Sign up </strong>
            to get the latest from our attorneys!
          </SubscriptionBannerTitle>

          <SubscriptionBannerContent>
            <SubscriptionBannerSubtitle>
              Explore What Matters Most to You.
            </SubscriptionBannerSubtitle>

            <SubscriptionBannerDescription>
              <p>
                Consider subscribing to our Firm Insights mailing list by
                clicking the button below so you can keep up to date with the
                firm`s latest articles covering various legal topics.
              </p>
              <p>
                Stay informed and inspired with the latest updates, insights,
                and events from Scarinci Hollenbeck. Our resource library
                provides valuable content across a range of categories to keep
                you connected and ahead of the curve.
              </p>
            </SubscriptionBannerDescription>

            <StandardBlueButton
              onClick={() => dispatch(handleSubscriptionModalOpener({ active: true }))}
              $isLight
            >
              Subscribe now
            </StandardBlueButton>
          </SubscriptionBannerContent>
        </SubscriptionBannerHolder>
      </ContainerDefault>
    </SubscriptionBannerSection>
  );
};

export default SubscriptionBanner;
