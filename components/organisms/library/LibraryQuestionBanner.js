import React from 'react';
import { OutlinedButton, StandardBlueButton } from 'styles/Buttons.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  DarkBannerButtons,
  DarkBannerContent,
  DarkBannerDescription,
  DarkBannerHolder,
  DarkBannerSection,
  DarkBannerSubtitle,
  DarkBannerTitle,
} from 'styles/DarkBanner.style';
import Link from 'next/link';
import { Title32 } from 'styles/common/Typography.style';
import { useDispatch } from 'react-redux';
import { handleQuestionModalOpener } from '../../../redux/slices/modals.slice';

const LibraryQuestionBanner = ({ isLinkCategory = true }) => {
  const dispatch = useDispatch();

  return (
    <DarkBannerSection>
      <ContainerDefault>
        <DarkBannerHolder>
          <DarkBannerTitle as={Title32}>
            Have a Question for Our Attorneys? We want to hear from you!
          </DarkBannerTitle>

          <DarkBannerContent>
            <DarkBannerSubtitle>
              Your insights help us shape content that truly matters to our
              readers.
            </DarkBannerSubtitle>

            <DarkBannerDescription>
              <p>
                If there&apos;s a legal topic you&apos;re curious about or a
                question you&apos;ve always wanted to ask a attorney — this is
                your chance.
              </p>
              <p>
                Submit your question below, and it might be featured (with an
                answer!) in an upcoming Attorney Spotlight article.
              </p>
            </DarkBannerDescription>

            <DarkBannerButtons>
              <StandardBlueButton
                onClick={() => dispatch(handleQuestionModalOpener({ active: true }))}
              >
                Submit a question
              </StandardBlueButton>

              {isLinkCategory && (
                <OutlinedButton
                  as={Link}
                  href="/library/category/attorney-spotlight"
                >
                  Open Attorney Spotlight
                </OutlinedButton>
              )}
            </DarkBannerButtons>
          </DarkBannerContent>
        </DarkBannerHolder>
      </ContainerDefault>
    </DarkBannerSection>
  );
};

export default LibraryQuestionBanner;
