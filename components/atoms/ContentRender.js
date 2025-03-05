import React from 'react';
import empty from 'is-empty';
import { ContentContainer } from 'styles/Content.style';
import { JSXWithDynamicLinks } from './micro-templates/JSXWithDynamicLinks';

const ContentRender = ({ content, customClass = '' }) => {
  if (empty(content)) return null;

  return (
    <ContentContainer className={customClass}>
      <JSXWithDynamicLinks HTML={content} />
    </ContentContainer>
  );
};

export default ContentRender;
