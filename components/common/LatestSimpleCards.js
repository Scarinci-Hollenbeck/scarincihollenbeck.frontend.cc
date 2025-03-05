import React from 'react';
import empty from 'is-empty';
import { changePostLink } from 'utils/helpers';
import { LatestSimpleCardsWrapper } from 'styles/LatestPosts.style';
import SimpleNewsCard from './SimpleNewsCard';

const LatestSimpleCards = ({ posts }) => {
  if (empty(posts)) return null;

  return (
    <LatestSimpleCardsWrapper>
      {posts.map((article) => (
        <SimpleNewsCard
          key={article?.databaseId}
          link={{ url: changePostLink(article?.uri) }}
          title={article?.title}
          label={article?.author?.node?.name || article?.author?.name}
          date={article?.date}
        />
      ))}
    </LatestSimpleCardsWrapper>
  );
};

export default LatestSimpleCards;
