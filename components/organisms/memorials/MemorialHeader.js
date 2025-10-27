import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import empty from 'is-empty';
import {
  MemorialHeaderHolder,
  MemorialHeaderRight,
  MemorialTitle,
} from 'styles/Memorials.style';
import ProfileImage from 'components/molecules/attorney/ProfileImage';
import {
  ProfileHeaderLeft,
  ProfileHeaderSection,
} from 'styles/attorney-page/ProfileHeader.style';
import BreadCrumbs from '../common/BreadCrumbs';
import MemorialLifespan from './MemorialLifespan';

const MemorialHeader = ({
  name, profileImage, born, death,
}) => (
  <ProfileHeaderSection>
    <ContainerDefault>
      <BreadCrumbs />
      <MemorialHeaderHolder>
        <ProfileHeaderLeft>
          <ProfileImage name={name} profileImage={profileImage} />
        </ProfileHeaderLeft>

        <MemorialHeaderRight>
          {!empty(name) && (
            <MemorialTitle>{`The Passing of ${name}`}</MemorialTitle>
          )}

          <MemorialLifespan born={born} death={death} />
        </MemorialHeaderRight>
      </MemorialHeaderHolder>
    </ContainerDefault>
  </ProfileHeaderSection>
);

export default MemorialHeader;
