import React from 'react';
import { ProfileRepresentativeItems } from 'styles/attorney-page/ProfileRepresentative.style';
import empty from 'is-empty';
import ProfileRepresentative from './ProfileRepresentative';

const ProfileRepresentatives = ({ representativeMatters, isPrint = false }) => {
  if (empty(representativeMatters)) return null;

  return (
    <ProfileRepresentativeItems>
      {representativeMatters.map((item, index) => (
        <ProfileRepresentative
          key={`${item?.title}-${index + 1}`}
          title={
            representativeMatters.length > 1 && !empty(item?.title)
              ? `${index + 1}. ${item?.title}`
              : item?.title
          }
          label={item?.label}
          content={item?.content}
          isSeparator={index !== 0}
          isPrint={isPrint}
        />
      ))}
    </ProfileRepresentativeItems>
  );
};

export default ProfileRepresentatives;
