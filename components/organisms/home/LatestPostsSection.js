import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { StandardBlueButton } from 'styles/Buttons.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  LatestPostsContent,
  LatestPostsHeader,
  LatestPostsHolder,
  LatestPostsTab,
  LatestPostsTabs,
  LatestPostsTitle,
  LatestPostsWrapper,
} from 'styles/LatestPosts.style';
import { latestPostTabs } from 'utils/constants';

const LatestPostsSlider = dynamic(() => import('./LatestPostsSlider'), {
  ssr: false,
});

const LatestPostsSection = ({ tabsData }) => {
  const [activeTabId, setActiveTabId] = useState('allPosts');
  const activeTabData = tabsData?.[activeTabId];

  return (
    <LatestPostsWrapper>
      <ContainerDefault>
        <LatestPostsHolder>
          <LatestPostsHeader>
            <LatestPostsTitle>Latest from the firm</LatestPostsTitle>

            <StandardBlueButton href="/library/category/client-alert" as={Link}>
              Open library
            </StandardBlueButton>
          </LatestPostsHeader>

          <LatestPostsTabs>
            {latestPostTabs?.map((tab) => (
              <LatestPostsTab
                key={`${tab?.label}-latest-posts-tab`}
                className={activeTabId === tab?.id ? 'active' : ''}
                onClick={() => setActiveTabId(tab?.id)}
              >
                {tab?.label}
              </LatestPostsTab>
            ))}
          </LatestPostsTabs>

          <AnimatePresence exitBeforeEnter>
            <LatestPostsContent
              key={`${activeTabId}-slider`}
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LatestPostsSlider
                activeTabData={activeTabData}
                activeTabId={activeTabId}
              />
            </LatestPostsContent>
          </AnimatePresence>
        </LatestPostsHolder>
      </ContainerDefault>
    </LatestPostsWrapper>
  );
};

export default LatestPostsSection;
