import PostBreadCrumbs from 'components/organisms/post/PostBreadcrumbs';
import Image from 'next/image';
import React from 'react';
import {
  SubHeaderIndustryAnchors,
  SubHeaderIndustryAnchorsLink,
  SubHeaderIndustryAnchorsList,
  SubHeaderIndustryAttorneys,
  SubHeaderIndustryAttorneysAvatar,
  SubHeaderIndustryAttorneysAvatars,
  SubHeaderIndustryBgImage,
  SubHeaderIndustryContainer,
  SubHeaderIndustryContent,
  SubHeaderIndustryDescription,
  SubHeaderIndustrySection,
  SubHeaderIndustryTop,
} from 'styles/subheader/SubHeaderIndustry.style';
import empty from 'is-empty';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { changeTitle } from 'utils/helpers';
import SubHeaderIndustrySlider from './SubHeaderIndustrySlider';

const SubHeaderIndustry = ({
  title,
  description,
  attorneys,
  slides,
  anchors,
  backgroundImage,
  attorneysAnchorId,
  setActiveTab,
}) => (
  <SubHeaderIndustrySection>
    <SubHeaderIndustryBgImage>
      {!empty(backgroundImage) && (
        <Image
          key={backgroundImage}
          src={backgroundImage}
          alt={`${title} background`}
          fill
          priority
          loading="eager"
          sizes="100vw"
        />
      )}
    </SubHeaderIndustryBgImage>
    <SubHeaderIndustryContainer>
      <PostBreadCrumbs />

      <SubHeaderIndustryTop>
        <SubHeaderIndustryContent>
          {!empty(title) && (
            <JSXWithDynamicLinks HTML={changeTitle(title, true)} />
          )}

          {!empty(description) && (
            <SubHeaderIndustryDescription>
              <JSXWithDynamicLinks HTML={description} />
            </SubHeaderIndustryDescription>
          )}
        </SubHeaderIndustryContent>

        <SubHeaderIndustryAnchors>
          {!empty(anchors) && (
            <SubHeaderIndustryAnchorsList>
              {anchors.map((anchor) => (
                <li key={anchor?.id}>
                  <SubHeaderIndustryAnchorsLink
                    title={anchor?.title}
                    href={`#${anchor?.id}`}
                  >
                    {anchor?.title}
                  </SubHeaderIndustryAnchorsLink>
                </li>
              ))}
            </SubHeaderIndustryAnchorsList>
          )}

          {!empty(attorneys) && (
            <SubHeaderIndustryAttorneys href={`#${attorneysAnchorId}`}>
              <SubHeaderIndustryAttorneysAvatars>
                {attorneys.map((attorney, index) => (
                  <li
                    key={attorney?.databaseId}
                    style={{ zIndex: attorneys.length - index }}
                  >
                    <SubHeaderIndustryAttorneysAvatar
                      src={attorney?.profileImage}
                      alt={attorney?.title}
                      width={70}
                      height={70}
                    />
                  </li>
                ))}
              </SubHeaderIndustryAttorneysAvatars>
            </SubHeaderIndustryAttorneys>
          )}
        </SubHeaderIndustryAnchors>
      </SubHeaderIndustryTop>

      <SubHeaderIndustrySlider setActiveTab={setActiveTab} slides={slides} />
    </SubHeaderIndustryContainer>
  </SubHeaderIndustrySection>
);

export default SubHeaderIndustry;
