import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'components/atoms/Loader';
import React, { memo } from 'react';
import {
  RandomSliderCard,
  RandomSliderCardDescription,
  RandomSliderCardDescriptionText,
  RandomSliderCardLink,
} from 'styles/RandomCardsSlider.style';
import AttorneyCard from 'components/shared/AttorneyCard';
import LogoSeparator from 'components/common/LogoSeparator';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import empty from 'is-empty';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const RandomBioCard = memo(({ displayedCard, randomIndex }) => {
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
          <AttorneyCard
            link={displayedCard?.uri || displayedCard?.link || '#'}
            name={displayedCard?.display_name || displayedCard?.title}
            designation={displayedCard?.designation}
            image={
              displayedCard?.profileImage
              || displayedCard?.better_featured_image
            }
            officeLocations={displayedCard?.location_array}
            number={displayedCard?.phone}
            email={displayedCard?.email}
            width={300}
            height={300}
            svgPhone={<FaPhoneAlt />}
            svgEmail={<MdEmail />}
          />
          <LogoSeparator />

          <RandomSliderCardDescription>
            <RandomSliderCardDescriptionText
              as={!empty(displayedCard?.biography) && 'div'}
            >
              {displayedCard?.miniBio
                || (!empty(displayedCard?.biography) && (
                  <JSXWithDynamicLinks HTML={displayedCard?.biography} />
                ))}
            </RandomSliderCardDescriptionText>

            <RandomSliderCardLink
              href={displayedCard?.uri || displayedCard?.link || '#'}
            >
              {`link to ${
                displayedCard?.display_name || displayedCard?.title
              } bio`}
            </RandomSliderCardLink>
          </RandomSliderCardDescription>
        </RandomSliderCard>
      </motion.div>
    </AnimatePresence>
  );
});

export default RandomBioCard;
