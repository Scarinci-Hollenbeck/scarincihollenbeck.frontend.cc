import Link from 'next/link';
import Image from 'next/image';
import {
  AttorneyCardBox,
  InfoBox,
  LinkBox,
  UserName,
} from 'styles/AttorneyCard.style';
import { useId } from 'react';
import ContactBoxTemplate from '../atoms/ContactBox';
import SHDiamond from '../../public/images/sh-mini-diamond-PNG.svg';

const renderLinkToLocationPractice = (locationsOrPractice) => {
  if (Array.isArray(locationsOrPractice)) {
    if (locationsOrPractice[0]?.uri) {
      return locationsOrPractice.map((office, idx) => (
        <li key={office.id || useId()}>
          <Link href={office?.uri}>
            {office.officeMainInformation.addressLocality
              || office.officeMainInformation}
          </Link>
          <>{idx < locationsOrPractice.length - 1 && ','}</>
        </li>
      ));
    }
  }
  return (
    <li className="d-flex flex-column gap-1">
      {locationsOrPractice.chair?.length > 0 && (
        <div className="d-flx">
          Chair:
          {locationsOrPractice.chair?.map((location) => (
            <Link key={location.id} href={`/practices/${location.slug}`}>
              {' '}
              {location?.title}
            </Link>
          ))}
        </div>
      )}
      {locationsOrPractice.coChair?.length > 0 && (
        <div className="d-flx">
          Co-Chair:
          {locationsOrPractice.coChair?.map((location) => (
            <Link key={location.id} href={`/practice/${location.slug}`}>
              {' '}
              {location?.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

const renderImage = (
  isPrint,
  image,
  name,
  width,
  height,
  locations,
  placeholderProp,
) => (isPrint ? (
// eslint-disable-next-line @next/next/no-img-element
  <img
    src={image.src || image}
    alt={name}
    width={
        width
        || (!Array.isArray(locations) && typeof locations !== 'undefined'
          ? 130
          : 125)
      }
    height={height || 150}
  />
) : (
  <Image
    placeholder={placeholderProp}
    blurDataURL={image || SHDiamond}
    loading="lazy"
    src={image || SHDiamond}
    alt={name}
    quality={75}
    width={
        width
        || (!Array.isArray(locations) && typeof locations !== 'undefined'
          ? 130
          : 125)
      }
    height={height || 150}
    sizes="130px"
  />
));

export default function AttorneyCard({
  link,
  image,
  name,
  designation,
  locations,
  number,
  email,
  title,
  width,
  height,
  svgPhone,
  svgEmail,
  officeLocations,
  isPrint = false,
}) {
  const placeholderProp = image?.src?.includes('next') || SHDiamond?.src?.includes('next')
    ? 'empty'
    : 'blur';

  return (
    <AttorneyCardBox className="attorney-card-box">
      <Link href={link} className="attorney-card-link" title={name} passHref>
        <span className="sr-only">{`Link to profile of ${name}`}</span>
      </Link>
      <LinkBox>
        {renderImage(
          isPrint,
          image,
          name,
          width,
          height,
          locations,
          placeholderProp,
        )}
        <InfoBox>
          <UserName>{name}</UserName>

          <p>{designation}</p>

          {locations && (
            <ul className="d-flex gap-1 m-0 p-0">
              {renderLinkToLocationPractice(locations)}
            </ul>
          )}
          <ContactBoxTemplate
            officeLocations={officeLocations}
            email={email}
            number={number}
            svgEmail={svgEmail}
            svgPhone={svgPhone}
          />
        </InfoBox>
      </LinkBox>
    </AttorneyCardBox>
  );
}
