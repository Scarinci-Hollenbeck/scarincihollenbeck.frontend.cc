import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'components/atoms/Loader';
import React, { memo } from 'react';
import {
  RandomSliderCard,
  RandomSliderCardDescription,
  RandomSliderCardDescriptionText,
  RandomSliderCardImage,
  RandomSliderCardLink,
  RandomSliderCardTitle,
} from 'styles/RandomCardsSlider.style';
import LogoSeparator from 'components/common/LogoSeparator';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import empty from 'is-empty';
import { PRODUCTION_URL } from 'utils/constants';
import Image from 'next/image';
import SHDiamond from '../../../public/images/sh-mini-diamond-PNG.svg';

const RandomPostCard = memo(({ displayedCard, randomIndex }) => {
  if (empty(displayedCard)) {
    return <Loader />;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={randomIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <RandomSliderCard>
          <RandomSliderCardImage>
            <Image
              src={displayedCard?.featuredImage?.node?.sourceUrl || SHDiamond}
              alt={displayedCard?.title}
              width={440}
              height={200}
              sizes="440px"
            />
          </RandomSliderCardImage>
          <LogoSeparator />

          <RandomSliderCardDescription>
            {!empty(displayedCard?.title) && (
              <RandomSliderCardTitle title={displayedCard?.title}>
                {displayedCard?.title}
              </RandomSliderCardTitle>
            )}

            {!empty(displayedCard?.excerpt) && (
              <RandomSliderCardDescriptionText as="div">
                <JSXWithDynamicLinks HTML={displayedCard?.excerpt} />
              </RandomSliderCardDescriptionText>
            )}

            <RandomSliderCardLink
              href={
                displayedCard?.uri.replace(PRODUCTION_URL, '') || '/library'
              }
            >
              Read the article
            </RandomSliderCardLink>
          </RandomSliderCardDescription>
        </RandomSliderCard>
      </motion.div>
    </AnimatePresence>
  );
});

export default RandomPostCard;
