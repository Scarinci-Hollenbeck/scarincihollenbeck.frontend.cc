import React from 'react';
import empty from 'is-empty';
import DisclaimerText from 'components/atoms/DisclaimerText';
import {
  ProfileSectionContainer,
  ProfileSectionHeader,
} from 'styles/attorney-page/ProfileSections.style';
import { Title20, UnderlinedLink } from 'styles/common/Typography.style';

const ProfileSectionWrapper = ({
  children, title, link, disclaimer,
}) => (
  <ProfileSectionContainer>
    {(!empty(title) || !empty(link?.href)) && (
      <ProfileSectionHeader>
        {!empty(title) && <Title20 as="h2">{title}</Title20>}
        {!empty(link?.href) && (
          <UnderlinedLink
            href={link?.href}
            target={!empty(link?.target) ? '_blank' : undefined}
            rel={!empty(link?.target) ? 'noopener noreferrer' : undefined}
            $isSmall
          >
            {link?.text}
          </UnderlinedLink>
        )}
      </ProfileSectionHeader>
    )}
    {children}
    {!empty(disclaimer) && <DisclaimerText text={disclaimer} />}
  </ProfileSectionContainer>
);

export default ProfileSectionWrapper;
