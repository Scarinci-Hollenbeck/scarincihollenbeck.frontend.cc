import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import Image from 'next/image';
import React from 'react';
import {
  LatestPostsCardLink,
  LatestsPostsCardAuthor,
  LatestsPostsCardContent,
  LatestsPostsCardDate,
  LatestsPostsCardDescription,
  LatestsPostsCardFooter,
  LatestsPostsCardImage,
  LatestsPostsCardTitle,
  LatestsPostsCardWrapper,
} from 'styles/LatestPosts.style';
import { PRODUCTION_URL } from 'utils/constants';
import { formatDate } from 'utils/helpers';

const LatestPostsCard = ({ article, isBig }) => (
  <LatestsPostsCardWrapper className={isBig ? 'card-big' : undefined}>
    {isBig && (
      <LatestsPostsCardImage>
        <Image
          loading="lazy"
          src={article?.featuredImage?.node?.sourceUrl}
          alt={article?.title}
          width={900}
          height={375}
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </LatestsPostsCardImage>
    )}

    <LatestsPostsCardContent>
      <LatestsPostsCardTitle>{article?.title}</LatestsPostsCardTitle>

      {article?.excerpt && (
        <LatestsPostsCardDescription>
          <JSXWithDynamicLinks HTML={article?.excerpt} />
        </LatestsPostsCardDescription>
      )}

      <LatestsPostsCardFooter>
        <LatestsPostsCardAuthor
          as={
            article?.author?.node?.slug.includes('scarinci-hollenbeck') && 'p'
          }
          href={
            !article?.author?.node?.slug.includes('scarinci-hollenbeck')
              ? `/library/author/${article?.author?.node?.slug}`
              : undefined
          }
        >
          <strong>Author: </strong>
          <span>{article?.author?.node?.name}</span>
        </LatestsPostsCardAuthor>

        <LatestsPostsCardDate dateTime={article?.date}>
          {formatDate(article?.date)}
        </LatestsPostsCardDate>
      </LatestsPostsCardFooter>
    </LatestsPostsCardContent>

    <LatestPostsCardLink
      href={article?.uri.replace(PRODUCTION_URL, '')}
      aria-label={`Read more about ${article?.title}`}
    />
  </LatestsPostsCardWrapper>
);

export default LatestPostsCard;
