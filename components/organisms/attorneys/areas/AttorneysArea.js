import AttorneyPracticeCard from 'components/molecules/practice/AttorneyPracticeCard';
import React, { useEffect, useRef } from 'react';
import {
  AttorneyAreaTitle,
  AttorneysAreaChair,
  AttorneysAreaContainer,
} from 'styles/AttorneysArea.style';
import empty from 'is-empty';

const AttorneysArea = ({
  attorneys,
  handleSetCardParams,
  handleSetCardGap,
  minHeight = null,
  cardTitleAs,
}) => {
  const { chairs, attorneysList } = attorneys;
  const chair = chairs[0];
  const contRef = useRef();

  useEffect(() => {
    if (handleSetCardGap && contRef.current) {
      const compStyle = getComputedStyle(contRef.current);
      const gap = compStyle.getPropertyValue('gap');
      handleSetCardGap(parseInt(gap, 10));
    }
  }, [handleSetCardGap]);

  return (
    <AttorneysAreaContainer minHeight={minHeight} ref={contRef}>
      {!empty(chair) && (
        <AttorneysAreaChair>
          <AttorneyAreaTitle>Chair</AttorneyAreaTitle>
          <AttorneyPracticeCard
            key={chair?.databaseId}
            link={chair?.link}
            image={chair?.profileImage}
            name={chair?.title}
            designation={chair?.designation}
            officeLocations={chair?.officeLocation}
            number={chair?.phoneNumber}
            email={chair?.email}
            width={180}
            height={210}
            handleSetCardParams={handleSetCardParams}
            cardTag={cardTitleAs || 'h4'}
          />
        </AttorneysAreaChair>
      )}

      {attorneysList?.length > 0
        && attorneysList.map(
          ({
            databaseId,
            link,
            profileImage,
            title,
            designation,
            officeLocation,
            phoneNumber,
            phone,
            email,
          }) => (
            <AttorneyPracticeCard
              key={databaseId || title}
              link={link}
              image={profileImage}
              name={title}
              designation={designation}
              officeLocations={officeLocation}
              number={phoneNumber || phone}
              email={email}
              width={180}
              height={210}
              handleSetCardParams={handleSetCardParams}
              cardTag={cardTitleAs}
            />
          ),
        )}
    </AttorneysAreaContainer>
  );
};

export default AttorneysArea;
