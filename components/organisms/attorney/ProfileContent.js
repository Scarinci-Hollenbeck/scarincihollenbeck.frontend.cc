import ProfileAside from 'components/molecules/attorney/ProfileAside';
import React from 'react';
import {
  ProfileContentAside,
  ProfileContentContainer,
  ProfileContentSection,
} from 'styles/attorney-page/ProfileContent.style';
import { ContainerDefault } from 'styles/Containers.style';
import ProfileSections from './ProfileSections';

const ProfileContent = ({ profileContent, asideItems }) => {
  const isAsideItems = Object.values(asideItems).filter(Boolean).length > 0;

  return (
    <ProfileContentSection>
      <ContainerDefault>
        <ProfileContentContainer>
          <ProfileSections {...profileContent} />

          {isAsideItems && (
            <ProfileContentAside>
              <ProfileAside {...asideItems} />
            </ProfileContentAside>
          )}
        </ProfileContentContainer>
      </ContainerDefault>
    </ProfileContentSection>
  );
};

export default ProfileContent;
