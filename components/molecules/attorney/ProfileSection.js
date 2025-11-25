import React from 'react';
import empty from 'is-empty';
import { globalColor } from 'styles/global_styles/Global.styles';
import dynamic from 'next/dynamic';
import ProfileSectionWrapper from './ProfileSectionWrapper';

const CollapseContent = dynamic(() => import('components/molecules/practice/CollapseContent'));

const ProfileSection = ({
  children,
  title,
  content,
  disclaimer,
  link,
  sectionId,
}) => {
  if (empty(content) && empty(children)) return null;

  return (
    <ProfileSectionWrapper
      disclaimer={disclaimer}
      title={title}
      link={link}
      sectionId={sectionId}
    >
      {!empty(content) && (
        <CollapseContent
          content={content}
          $gradientColor={globalColor.gray.gray10}
        />
      )}
      {!empty(children) && children}
    </ProfileSectionWrapper>
  );
};

export default ProfileSection;
