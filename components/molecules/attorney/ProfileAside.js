import React from 'react';
import { ProfileAsideItems } from 'styles/attorney-page/ProfileAside.style';
import empty from 'is-empty';
import ProfileDetail from './ProfileDetail';

const ProfileAside = (props) => {
  const {
    education,
    barAdmissions,
    affiliations,
    additionalInfo,
    awardsRecognitions,
  } = props;
  return (
    <ProfileAsideItems>
      {!empty(education) && (
        <ProfileDetail title="Education" content={education} />
      )}
      {!empty(barAdmissions) && (
        <ProfileDetail title="Admissions" content={barAdmissions} />
      )}
      {!empty(affiliations) && (
        <ProfileDetail title="Affiliations" content={affiliations} />
      )}
      {!empty(awardsRecognitions) && (
        <ProfileDetail
          title="Awards & Recognitions"
          content={awardsRecognitions}
          link={{ text: 'Award Methodology', href: '/awards' }}
        />
      )}
      {!empty(additionalInfo)
        && additionalInfo.map(
          (item) => (!empty(item?.content) || !empty(item?.columns)) && (
          <ProfileDetail
            key={`${item?.title}-additional-info`}
            title={item?.title}
            content={item?.content}
            columns={item?.columns}
          />
          ),
        )}
    </ProfileAsideItems>
  );
};

export default ProfileAside;
