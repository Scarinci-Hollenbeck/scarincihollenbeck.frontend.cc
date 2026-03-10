import Image from 'next/image';
import React from 'react';
import {
  AwardCardContent,
  AwardCardImage,
  AwardCardWrapper,
} from 'styles/Awards.style';
import empty from 'is-empty';
import Link from 'next/link';
import { IMAGE_BLUR_PLACEHOLDER } from 'utils/constants';

const AwardCard = ({
  image,
  label,
  year,
  link,
  isLightVariant,
  isPrint = false,
}) => (
  <AwardCardWrapper
    as={!empty(link) && Link}
    href={!empty(link) ? link : undefined}
    target={!empty(link) && link.includes('https') ? '_blank' : undefined}
    $isLink={!empty(link)}
    $isLightVariant={isLightVariant}
  >
    <AwardCardImage>
      {isPrint ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/img-redundant-alt
        <img src={image?.src} alt={image?.alt} />
      ) : (
        <Image
          src={image?.src}
          alt={image?.alt}
          width={200}
          height={200}
          loading="lazy"
          quality={60}
          sizes="(max-width: 768px) 144px, 200px"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_PLACEHOLDER}
        />
      )}
    </AwardCardImage>

    {(!empty(label) || !empty(year)) && (
      <AwardCardContent $isLightVariant={isLightVariant}>
        {!empty(label) && <p title={label}>{label}</p>}
        {!empty(year) && <span>{year}</span>}
      </AwardCardContent>
    )}
  </AwardCardWrapper>
);

export default AwardCard;
