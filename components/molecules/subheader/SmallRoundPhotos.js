import Image from 'next/image';
import React from 'react';
import { Photo, PhotoCount, PhotoList } from 'styles/practices-special-style/subheader/SmallRoundPhotos.style';

const SmallRoundPhotos = ({ photos, maxPhotos }) => {
  const visiblePhotos = photos.slice(0, maxPhotos + 1);
  let countHidenPhotos = photos.length - visiblePhotos.length + 1;

  if (photos.length <= maxPhotos) {
    countHidenPhotos = 0;
  }

  return (
    photos.length > 0 && maxPhotos > 0 && (
      <PhotoList>
        {visiblePhotos.map((photo, index) => (
          <Photo key={photo} style={{ zIndex: maxPhotos - index }}>
            <Image src={photo} alt="photo" width={100} height={100} />
            {index === visiblePhotos.length - 1 && countHidenPhotos > 0 && (
            <PhotoCount>
              {`+${countHidenPhotos}`}
            </PhotoCount>
            )}
          </Photo>
        ))}
      </PhotoList>
    )
  );
};
export default SmallRoundPhotos;
