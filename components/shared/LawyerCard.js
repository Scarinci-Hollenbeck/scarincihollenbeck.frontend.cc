import Image from 'next/image';
import React from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { MdLocalPhone } from 'react-icons/md';
import {
  LawyerCardChair,
  LawyerCardContact,
  LawyerCardContacts,
  LawyerCardContent,
  LawyerCardDescription,
  LawyerCardDesignation,
  LawyerCardHeader,
  LawyerCardImage,
  LawyerCardLifespan,
  LawyerCardLifespanItem,
  LawyerCardLocation,
  LawyerCardLocations,
  LawyerCardName,
  LawyerCardWrapper,
} from 'styles/LawyerCard.style';
import empty from 'is-empty';
import Link from 'next/link';
import SHDiamond from '../../public/images/sh-mini-diamond-PNG.svg';

const LawyerCard = ({
  image,
  link,
  name,
  designation,
  locations,
  number,
  email,
  born,
  death,
  isHorizontal,
  isChair,
}) => (
  <LawyerCardWrapper className={isHorizontal ? 'horizontal-card' : ''}>
    <LawyerCardImage>
      <Image
        src={image || SHDiamond}
        alt={`${name} photo`}
        quality={80}
        width={400}
        height={350}
        sizes="400px"
      />
    </LawyerCardImage>

    <LawyerCardContent>
      {isChair && isHorizontal && <LawyerCardChair>chair</LawyerCardChair>}
      <LawyerCardHeader>
        <LawyerCardDescription>
          {!empty(name) && <LawyerCardName>{name}</LawyerCardName>}
          {!empty(designation) && (
            <LawyerCardDesignation>{designation}</LawyerCardDesignation>
          )}
        </LawyerCardDescription>
        {(!empty(number) || !empty(email)) && (
          <LawyerCardContacts>
            {!empty(number) && (
              <LawyerCardContact href={`tel:${number}`}>
                <MdLocalPhone size={20} />
              </LawyerCardContact>
            )}
            {!empty(email) && (
              <LawyerCardContact href={`mailto:${email}`}>
                <BsFillEnvelopeFill />
              </LawyerCardContact>
            )}
          </LawyerCardContacts>
        )}
      </LawyerCardHeader>
      {(!empty(born) || !empty(death)) && (
        <LawyerCardLifespan>
          {!empty(born) && (
            <LawyerCardLifespanItem>
              <span>Born:</span>
              {born}
            </LawyerCardLifespanItem>
          )}
          {!empty(death) && (
            <LawyerCardLifespanItem>
              <span>Death:</span>
              {death}
            </LawyerCardLifespanItem>
          )}
        </LawyerCardLifespan>
      )}
      {!empty(locations) && Array.isArray(locations) && (
        <LawyerCardLocations>
          {locations.map((location, index) => (
            <LawyerCardLocation key={location?.id || location?.databaseId}>
              {location?.title
                || location?.officeMainInformation?.addressLocality
                || location?.officeMainInformation}
              {index < locations.length - 1 && ','}
            </LawyerCardLocation>
          ))}
        </LawyerCardLocations>
      )}
    </LawyerCardContent>

    {!empty(link) && (
      <Link href={link} className="attorney-card-link" title={name} passHref>
        <span className="sr-only">{`Link to profile of ${name}`}</span>
      </Link>
    )}
  </LawyerCardWrapper>
);

export default LawyerCard;
