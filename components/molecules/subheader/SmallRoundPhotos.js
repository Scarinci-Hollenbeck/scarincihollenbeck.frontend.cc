import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import { Photo, PhotoCount, PhotoList } from 'styles/practices-special-style/subheader/SmallRoundPhotos.style';

const SmallRoundPhotos = ({ attorneyListPractice, maxPhotos }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? attorneyListPractice : attorneyListPractice.slice(0, maxPhotos);
  const countHidenItems = attorneyListPractice.length - visibleItems.length;

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    attorneyListPractice.length > 0 && maxPhotos > 0 && (
      <PhotoList>
        {visibleItems.map(({
          databaseId, designation, phoneNumber, profileImage, title,
        }, index) => (
          <Photo key={databaseId}>
            <Image src={profileImage} alt="photo" width={100} height={100} />
            {index === visibleItems.length - 1 && countHidenItems > 0 && (
            <PhotoCount onClick={handleShowAll}>
              {`+${countHidenItems}`}
            </PhotoCount>
            )}
          </Photo>
        ))}
        {showAll && (
          <button onClick={handleShowAll}>
            Hide photos
          </button>
        )}
      </PhotoList>
    )
  );
};
export default SmallRoundPhotos;
