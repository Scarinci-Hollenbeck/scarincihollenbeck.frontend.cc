import React from 'react';
import empty from 'is-empty';
import {
  ProfileRepresentativeHeader,
  ProfileRepresentativeContainer,
  ProfileRepresentativeTitle,
  ProfileRepresentativeLabel,
} from 'styles/attorney-page/ProfileRepresentative.style';
import { globalColor } from 'styles/global_styles/Global.styles';
import dynamic from 'next/dynamic';

const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));
const ContentRender = dynamic(() => import('components/atoms/ContentRender'));
const CollapseContent = dynamic(() => import('../practice/CollapseContent'));

const ProfileRepresentative = ({
  title,
  label,
  content,
  isSeparator = false,
  isPrint = false,
}) => {
  if (empty(content)) return null;

  return (
    <>
      {isSeparator && <LogoSeparator direction="row" />}

      <ProfileRepresentativeContainer>
        {(!empty(title) || !empty(label)) && (
          <ProfileRepresentativeHeader>
            {!empty(title) && (
              <ProfileRepresentativeTitle>{title}</ProfileRepresentativeTitle>
            )}
            {!empty(label) && (
              <ProfileRepresentativeLabel>{label}</ProfileRepresentativeLabel>
            )}
          </ProfileRepresentativeHeader>
        )}

        {!isPrint ? (
          <CollapseContent
            content={content}
            $gradientColor={globalColor.gray.gray10}
            $listMarkerColor={globalColor.blue.blue400}
            $fontColor={globalColor.blue.darkBlue}
          />
        ) : (
          <ContentRender
            content={content}
            $listMarkerColor={globalColor.blue.blue400}
            $fontColor={globalColor.blue.darkBlue}
            isPrint
          />
        )}
      </ProfileRepresentativeContainer>
    </>
  );
};

export default ProfileRepresentative;
