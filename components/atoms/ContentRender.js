import React from 'react';
import empty from 'is-empty';
import { ContentContainer } from 'styles/Content.style';
import { JSXWithDynamicLinks } from './micro-templates/JSXWithDynamicLinks';

const ContentRender = ({
  content, customClass = '', isPrint, ...props
}) => {
  if (empty(content)) return null;

  return (
    <ContentContainer className={customClass} {...props}>
      <JSXWithDynamicLinks HTML={content} print={isPrint} />
    </ContentContainer>
  );
};

export default ContentRender;
