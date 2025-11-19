import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import React, { useEffect, useRef, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import {
  CollapseButton,
  CollapseContentWrapper,
} from 'styles/CollapseContent.style';
import empty from 'is-empty';

const MAX_HEIGHT = 500;

const CollapseContent = ({
  title, content, id, ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkHeight = () => {
      const short = el.clientHeight <= MAX_HEIGHT;
      setIsShort(short);
      setOpen(short);
    };

    checkHeight();

    const observer = new ResizeObserver(() => checkHeight());
    observer.observe(el);

    return () => observer.disconnect();
  }, [content]);

  return (
    <div
      className="content-block margin-scroll"
      id={id ? `${id}-section` : undefined}
    >
      <Collapse in={isShort || open}>
        <CollapseContentWrapper {...props}>
          {!empty(title) && <h2>{title}</h2>}
          <div ref={contentRef}>
            <JSXWithDynamicLinks HTML={content} />
          </div>
        </CollapseContentWrapper>
      </Collapse>

      {!isShort && (
        <CollapseButton
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="collapse-opener"
        >
          {open ? '' : 'Read more'}
        </CollapseButton>
      )}
    </div>
  );
};

export default CollapseContent;
