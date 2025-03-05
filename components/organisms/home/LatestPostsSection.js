import DisclaimerText from 'components/atoms/DisclaimerText';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { StandardBlueButton } from 'styles/Buttons.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  LatestPostsHeader,
  LatestPostsHolder,
  LatestPostsWrapper,
} from 'styles/LatestPosts.style';
import { Title32 } from 'styles/common/Typography.style';
import empty from 'is-empty';

const LatestPostsTabsRender = dynamic(() => import('./LatestPostsTabsRender'));
const LatestSimpleCards = dynamic(() => import('components/common/LatestSimpleCards'));

const LatestPostsSection = ({
  tabsData,
  posts,
  anchorId,
  title = 'Latest from the firm',
}) => {
  if (empty(tabsData) && empty(posts)) return null;

  return (
    <LatestPostsWrapper
      id={anchorId}
      data-testid="latest-posts"
      className="margin-scroll"
    >
      <ContainerDefault>
        <LatestPostsHolder>
          <LatestPostsHeader>
            <Title32>{title}</Title32>

            <StandardBlueButton href="/library" as={Link}>
              Open library
            </StandardBlueButton>
          </LatestPostsHeader>

          {!empty(tabsData) ? (
            <LatestPostsTabsRender tabsData={tabsData} />
          ) : (
            <LatestSimpleCards posts={posts} />
          )}

          <DisclaimerText text="No aspect of the advertisement has been approved by the Supreme Court. Results may vary depending on your particular facts and legal circumstances." />
        </LatestPostsHolder>
      </ContainerDefault>
    </LatestPostsWrapper>
  );
};

export default LatestPostsSection;
