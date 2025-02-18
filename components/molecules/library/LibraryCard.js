import Image from 'next/image';
import React, { useCallback } from 'react';
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
  onTagClick,
}) => {
  const handleTagClick = useCallback(
    (e, tag) => {
      if (onTagClick) {
        e.preventDefault();
        onTagClick(tag);
      }
    },
    [onTagClick],
  );
  return (
    <LibraryCardBox>
      <LibraryCardImage $isEmptyImage={!image || empty(image)}>
        <Image
          src={image || SHDiamond}
          alt={`${title} post image`}
          width={500}
          height={240}
          sizes="500px"
        />
      </LibraryCardImage>

      <LibraryCardContent>
        {!empty(title) && <Title20 title={title}>{title}</Title20>}
        {!empty(description) && (
          <LibraryCardText>
            <JSXWithDynamicLinks HTML={description} />
          </LibraryCardText>
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
                aria-label={author?.name}
                title={author?.name}
              >
                {author?.name}
              </LibraryCardAuthorLink>
            </LibraryCardAuthor>
          )}

          {!empty(date) && (
            <LibraryCardDate datetime={date}>
              {formatDate(date)}
            </LibraryCardDate>
          )}
        </LibraryCardFooter>

        {!empty(tags) && (
          <LibraryCardTags>
            {tags.slice(0, 3).map((tag) => (
              <LibraryTag key={tag?.databaseId || tag?.id}>
                <LibraryTagLink
                  href={`/library/search?tag=${tag?.databaseId || tag?.id}`}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag?.name}
                </LibraryTagLink>
              </LibraryTag>
            ))}
          </LibraryCardTags>
        )}
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
};

export default LibraryCard;
