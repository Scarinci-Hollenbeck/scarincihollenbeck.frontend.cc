import Link from 'next/link';
import Image from 'next/image';
import {
  AttorneyCardBox,
  ContactBox,
  ImageBox,
  InfoBox,
  LinkBox,
  PhotoBox,
  UserName,
} from 'styles/AttorneyCard.style';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import { useId } from 'react';

const renderLinkToLocationPractice = (locationsOrPractice) => {
  if (Array.isArray(locationsOrPractice)) {
    if (locationsOrPractice[0]?.uri) {
      return locationsOrPractice.map((office, idx) => (
        <li key={office.id || useId()}>
          <Link href={office?.uri} legacyBehavior>
            <a>{office.officeMainInformation.addressLocality || office.officeMainInformation}</a>
          </Link>
          <>{idx < locationsOrPractice.length - 1 && ','}</>
        </li>
      ));
    }
  }
  return (
    <div className="d-flex flex-column gap-1">
      {locationsOrPractice.chair?.length > 0 && (
        <div className="d-flx">
          Chair:
          {locationsOrPractice.chair?.map((location) => (
            <Link key={location.id} href={`/practices/${location.slug}`} legacyBehavior>
              <a>
                {' '}
                {location?.title}
              </a>
            </Link>
          ))}
        </div>
      )}
      {locationsOrPractice.coChair?.length > 0 && (
        <div className="d-flx">
          Co-Chair:
          {locationsOrPractice.coChair?.map((location) => (
            <Link key={location.id} href={`/practice/${location.slug}`} legacyBehavior>
              <a>
                {' '}
                {location?.title}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AttorneyCard({
  link,
  image,
  name,
  designation,
  locations,
  number,
  email,
  title,
}) {
  return (
    <AttorneyCardBox>
      <Link href={link} passHref legacyBehavior>
        <LinkBox>
          {image ? (
            <PhotoBox>
              <Image
                placeholder="blur"
                blurDataURL={image}
                loading="lazy"
                src={image}
                alt={name}
                layout="fixed"
                width={!Array.isArray(locations) && typeof locations !== 'undefined' ? 130 : 125}
                height={150}
              />
            </PhotoBox>
          ) : (
            <ImageBox image={image} />
          )}
          <InfoBox>
            <UserName>{name}</UserName>

            <p>{designation}</p>

            {locations && (
              <ul className="d-flex gap-1 m-0 p-0">{renderLinkToLocationPractice(locations)}</ul>
            )}
            <ContactBox>
              <a onClick={(e) => e.stopPropagation()} href={`tel:${number}`}>
                <BsFillTelephoneFill />
                {' '}
                <span>{number}</span>
              </a>
              <a onClick={(e) => e.stopPropagation()} href={`mailto:${email}`}>
                <BsFillEnvelopeFill />
                {' '}
                <span>{email}</span>
              </a>
            </ContactBox>
          </InfoBox>
        </LinkBox>
      </Link>
    </AttorneyCardBox>
  );
}
