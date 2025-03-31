import React from 'react';
import empty from 'is-empty';
import {
  SpotlightDescription,
  SpotlightHolder,
  SpotlightImage,
  SpotlightWrapper,
} from 'styles/industries/IndustrySpotlight.style';
import { ContainerDefault } from 'styles/Containers.style';
import { Title60 } from 'styles/common/Typography.style';
import parse from 'html-react-parser';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import Image from 'next/image';

const getHighlightTitle = (title) => {
  if (empty(title)) return null;
  const words = title.split(' ');
  const halfWordsLength = Math.ceil(words.length / 2);

  const firstHalf = words.slice(0, halfWordsLength).join(' ');
  const secondHalf = words.slice(halfWordsLength).join(' ');

  return `<strong>${firstHalf}</strong> ${secondHalf}`;
};

const IndustrySpotlight = ({ spotlight, anchorId }) => {
  const { title, description, image } = spotlight;
  if (empty(description) && empty(title)) return null;

  const highlightedTitle = getHighlightTitle(title);

  return (
    <SpotlightWrapper className="margin-scroll" id={anchorId}>
      <ContainerDefault>
        <SpotlightHolder>
          {!empty(highlightedTitle) && (
            <Title60>{parse(highlightedTitle)}</Title60>
          )}
          {!empty(description) && (
            <SpotlightDescription>
              {' '}
              <JSXWithDynamicLinks HTML={description} />
            </SpotlightDescription>
          )}

          {!empty(image) && (
            <SpotlightImage>
              <Image
                src={image?.sourceUrl}
                alt={title || 'spotlight image'}
                width={image?.mediaDetails?.width || 1656}
                height={image?.mediaDetails?.height || 600}
                sizes="100dvw"
              />
            </SpotlightImage>
          )}
        </SpotlightHolder>
      </ContainerDefault>
    </SpotlightWrapper>
  );
};

export default IndustrySpotlight;
