import Image from 'next/image';
import React from 'react';
import { Title20 } from 'styles/common/Typography.style';
import {
  LibraryCardAuthor,
  LibraryCardAuthorLink,
  LibraryCardBox,
  LibraryCardContent,
  LibraryCardDate,
  LibraryCardFooter,
  LibraryCardImage,
  LibraryCardLink,
  LibraryCardTags,
  LibraryCardText,
} from 'styles/library/LibraryCard.style';
import empty from 'is-empty';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { changePostLink, formatDate } from 'utils/helpers';
import { LibraryTag, LibraryTagLink } from 'styles/library/LibraryTags.style';
import SHDiamond from '../../../public/images/sh-mini-diamond-PNG.svg';

const LibraryCard = ({
  title,
  image,
  uri,
  description,
  author,
  date,
  tags,
}) => (
  <LibraryCardBox>
    {!empty(title) && (
      <LibraryCardImage $isEmptyImage={!image || empty(image)}>
        <Image
          src={image || SHDiamond}
          alt={`${title} post image`}
          width={500}
          height={240}
          sizes="500px"
        />
      </LibraryCardImage>
    )}

    <LibraryCardContent>
      {!empty(title) && <Title20 title={title}>{title}</Title20>}
      {!empty(description) && (
        <LibraryCardText>
          <JSXWithDynamicLinks HTML={description} />
        </LibraryCardText>
      )}
      {!empty(tags) && (
        <LibraryCardTags>
          {tags.slice(0, 3).map((tag) => (
            <LibraryTag key={tag?.databaseId || tag?.id}>
              <LibraryTagLink href={`/library${tag?.uri || tag?.url}`}>
                {tag?.name}
              </LibraryTagLink>
            </LibraryTag>
          ))}
        </LibraryCardTags>
      )}

      <LibraryCardFooter>
        {!empty(author?.name) && (
          <LibraryCardAuthor>
            <span>Author: </span>
            <LibraryCardAuthorLink
              as={author?.uri.includes('scarinci-hollenbeck') && 'span'}
              href={
                !author?.uri.includes('scarinci-hollenbeck')
                  ? `/library${author?.uri}`
                  : undefined
              }
            >
              {author?.name}
            </LibraryCardAuthorLink>
          </LibraryCardAuthor>
        )}

        {!empty(date) && (
          <LibraryCardDate dateTime={date}>{formatDate(date)}</LibraryCardDate>
        )}
      </LibraryCardFooter>
    </LibraryCardContent>

    <LibraryCardLink
      href={changePostLink(uri)}
      passHref
      aria-label={`Read more about ${title}`}
      title={title}
    >
      <span className="sr-only">{`Link to post with title - "${title}"`}</span>
    </LibraryCardLink>
  </LibraryCardBox>
);

export default LibraryCard;
