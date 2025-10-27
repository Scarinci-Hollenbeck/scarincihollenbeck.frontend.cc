import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import React from 'react';
import empty from 'is-empty';
import {
  ProfileDetailColumn,
  ProfileDetailColumns,
  ProfileDetailColumnSubtitle,
  ProfileDetailColumnText,
  ProfileDetailColumnTitle,
  ProfileDetailContent,
  ProfileDetailItem,
  ProfileDetailTitle,
} from 'styles/attorney-page/ProfileDetail.style';
import { UnderlinedLink } from 'styles/common/Typography.style';

const ProfileDetail = ({
  title, content, link, columns,
}) => {
  if (empty(content) && empty(columns)) return null;
  return (
    <ProfileDetailItem className="item-info-box">
      {!empty(title) && <ProfileDetailTitle>{title}</ProfileDetailTitle>}
      {!empty(content) && (
        <ProfileDetailContent>
          <JSXWithDynamicLinks HTML={content} />
        </ProfileDetailContent>
      )}

      {!empty(link?.href) && (
        <UnderlinedLink href={link.href} $isSmall>
          {link.text || 'Learn More'}
        </UnderlinedLink>
      )}

      {!empty(columns) && (
        <ProfileDetailColumns>
          {columns?.map(({ subtitle, title, text }, index) => (
            <ProfileDetailColumn key={`${title}-${index + 1}-column`}>
              {!empty(subtitle) && (
                <ProfileDetailColumnSubtitle>
                  {subtitle}
                </ProfileDetailColumnSubtitle>
              )}
              {!empty(title) && (
                <ProfileDetailColumnTitle>{title}</ProfileDetailColumnTitle>
              )}
              {!empty(text) && (
                <ProfileDetailColumnText>
                  <JSXWithDynamicLinks HTML={text} />
                </ProfileDetailColumnText>
              )}
            </ProfileDetailColumn>
          ))}
        </ProfileDetailColumns>
      )}
    </ProfileDetailItem>
  );
};

export default ProfileDetail;
