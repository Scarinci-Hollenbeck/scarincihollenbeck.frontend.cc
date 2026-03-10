import Link from 'next/link';
import Image from 'next/image';
import {
  AttorneyCardBox,
  InfoBox,
  LinkBox,
  UserName,
} from 'styles/AttorneyCard.style';
import ContactBoxTemplate from '../atoms/ContactBox';
import SHDiamond from '../../public/images/sh-mini-diamond-PNG.svg';

const renderImage = (isPrint, image, name, width, height, placeholderProp) => (isPrint ? (
// eslint-disable-next-line @next/next/no-img-element
  <img
    src={image.src || image}
    alt={name}
    width={width || 125}
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
    width={width || 125}
    height={height || 150}
    sizes="130px"
  />
));

export default function AttorneyCard({
  link,
  image,
  name,
  designation,
  number,
  email,
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
        {renderImage(isPrint, image, name, width, height, placeholderProp)}
        <InfoBox>
          <UserName>{name}</UserName>

          <p>{designation}</p>

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
