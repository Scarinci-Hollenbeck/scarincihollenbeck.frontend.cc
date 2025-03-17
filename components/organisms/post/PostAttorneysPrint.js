import React from 'react';
import { AttorneysAreaContainer } from 'styles/AttorneysArea.style';
import { Title32 } from 'styles/common/Typography.style';
import { PostAttorneysPrintSection } from 'styles/Post/PostAttorneysPrint.style';
import empty from 'is-empty';
import AttorneyPracticeCard from 'components/molecules/practice/AttorneyPracticeCard';

const PostAttorneysPrint = ({
  title = 'Lawyers mentioned in this article',
  attorneys,
}) => {
  if (empty(attorneys)) return null;
  return (
    <PostAttorneysPrintSection>
      <Title32>{title}</Title32>

      <AttorneysAreaContainer>
        {attorneys.map(
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
              isPrint
            />
          ),
        )}
      </AttorneysAreaContainer>
    </PostAttorneysPrintSection>
  );
};

export default PostAttorneysPrint;
