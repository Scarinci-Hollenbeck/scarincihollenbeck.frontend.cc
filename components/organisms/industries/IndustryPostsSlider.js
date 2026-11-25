import React from 'react';
import {
  IndustryPostsContainer,
  IndustryPostsHeader,
  IndustryPostsSection,
  IndustryPostsTitle,
} from 'styles/industries/IndustryPostsSlider.style';
import empty from 'is-empty';
import DisclaimerText from 'components/atoms/DisclaimerText';
import { StandardBlueButton } from 'styles/Buttons.style';
import Link from 'next/link';
import RelatedPostsSlider from '../post/RelatedPostsSlider';

const IndustryPostsSlider = ({
  posts,
  anchorId,
  industryId,
  articlesTagId,
}) => {
  if (empty(posts)) return null;

  const libraryHref = articlesTagId
    ? `/library/search?tag=${articlesTagId}`
    : `/library/search?industries=${industryId}`;

  return (
    <IndustryPostsSection id={anchorId} className="margin-scroll">
      <IndustryPostsContainer>
        <IndustryPostsHeader>
          <IndustryPostsTitle>
            Related
            <strong> Articles</strong>
          </IndustryPostsTitle>

          <StandardBlueButton
            $isLight
            as={Link}
            href={libraryHref}
            rel="nofollow"
          >
            Open library
          </StandardBlueButton>
        </IndustryPostsHeader>

        <RelatedPostsSlider items={posts} isDarkerCards />
        <DisclaimerText
          text="No Aspect of the advertisement has been approved by the Supreme Court.
        Results may vary depending on your particular facts and legal
        circumstances."
        />
      </IndustryPostsContainer>
    </IndustryPostsSection>
  );
};

export default IndustryPostsSlider;
