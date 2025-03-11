import Image from 'next/image';
import {
  PracticeAttorneysCard,
  PracticeAttorneysCardName,
} from 'styles/practices/PracticeAttorneys';
import { useEffect, useRef, useState } from 'react';
import useStateScreen from 'hooks/useStateScreen';
import Link from 'next/link';
import ContactBoxTemplate from '../../atoms/ContactBox';

const AttorneyPracticeCard = ({
  link,
  image,
  name,
  designation,
  number,
  email,
  width,
  height,
  handleSetCardParams,
  officeLocations,
  cardTag = null,
  isPrint,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { isBigTabletScreen } = useStateScreen();
  const cardRef = useRef();
  const ContentTag = isBigTabletScreen ? 'button' : 'div';

  const handleClickContent = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (handleSetCardParams && cardRef.current) {
      handleSetCardParams(
        cardRef.current.clientWidth,
        cardRef.current.clientHeight,
      );
    }
  }, [handleSetCardParams]);

  return (
    <PracticeAttorneysCard
      className={`${isActive ? 'active' : ''}`}
      ref={cardRef}
    >
      <Link href={link} className="attorney__link" aria-label={name} />
      <div className="attorney__image">
        {isPrint ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            width={width}
            height={height}
            alt={`Attorney, ${name}`}
          />
        ) : (
          <Image
            src={image}
            width={width}
            height={height}
            alt={`Attorney, ${name}`}
          />
        )}
      </div>
      <ContentTag
        className="attorney__content"
        onClick={(e) => handleClickContent(e)}
      >
        <PracticeAttorneysCardName as={cardTag && cardTag}>
          {name}
        </PracticeAttorneysCardName>
        <p className="attorney__designation">{designation}</p>
        <div className="attorney__contact">
          <ContactBoxTemplate
            email={email}
            number={number}
            officeLocations={officeLocations}
          />
        </div>
      </ContentTag>
    </PracticeAttorneysCard>
  );
};

export default AttorneyPracticeCard;
