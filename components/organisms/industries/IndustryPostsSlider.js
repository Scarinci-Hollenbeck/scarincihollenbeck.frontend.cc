import React from 'react';
import {
  IndustryPostsContainer,
  IndustryPostsSection,
  IndustryPostsTitle,
} from 'styles/industries/IndustryPostsSlider.style';
import empty from 'is-empty';
import DisclaimerText from 'components/atoms/DisclaimerText';
import RelatedPostsSlider from '../post/RelatedPostsSlider';

const IndustryPostsSlider = ({ posts, anchorId }) => {
  if (empty(posts)) return null;

  return (
    <IndustryPostsSection id={anchorId} className="margin-scroll">
      <IndustryPostsContainer>
        <IndustryPostsTitle>
          Related
          <strong> Articles</strong>
        </IndustryPostsTitle>

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
