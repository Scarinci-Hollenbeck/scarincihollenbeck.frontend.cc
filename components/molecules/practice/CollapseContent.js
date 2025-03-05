import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import React, { useEffect, useRef, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import {
  CollapseButton,
  CollapseContentWrapper,
} from 'styles/CollapseContent.style';
import { ContentContainer } from 'styles/Content.style';

const CollapseContent = ({ title, content, id }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const isContentShort = contentRef.current && contentRef.current.clientHeight < 500;

  useEffect(() => {
    const handleContentHeight = () => {
      if (contentRef.current) {
        if (contentRef.current.clientHeight < 500) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    };

    handleContentHeight();
  }, [content]);

  if (isContentShort) {
    return (
      <ContentContainer
        ref={contentRef}
        className="content-block margin-scroll"
        id={`${id}-section`}
      >
        <h2>{title}</h2>
        <JSXWithDynamicLinks HTML={content} />
      </ContentContainer>
    );
  }

  return (
    <div className="content-block margin-scroll" id={`${id}-section`}>
      <Collapse in={open}>
        <CollapseContentWrapper>
          <h2>{title}</h2>
          <div ref={contentRef}>
            <JSXWithDynamicLinks HTML={content} />
          </div>
        </CollapseContentWrapper>
      </Collapse>
      <CollapseButton
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="collapse-opener"
      >
        {open ? '' : 'Read more'}
      </CollapseButton>
    </div>
  );
};

export default CollapseContent;
