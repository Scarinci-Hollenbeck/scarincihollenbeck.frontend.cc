import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import {
  LatestPostsContent,
  LatestPostsTab,
  LatestPostsTabs,
} from 'styles/LatestPosts.style';
import { latestPostTabs } from 'utils/constants';

const LatestPostsSlider = dynamic(() => import('./LatestPostsSlider'));

const LatestPostsTabsRender = ({ tabsData }) => {
  const [activeTabId, setActiveTabId] = useState(latestPostTabs[0]?.id);
  const activeTabData = tabsData?.[activeTabId];
  return (
    <>
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

      <AnimatePresence mode="wait">
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
    </>
  );
};

export default LatestPostsTabsRender;
