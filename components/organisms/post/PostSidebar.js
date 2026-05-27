import React, { useCallback, useEffect, useState } from 'react';
import {
  PostSidebarAnchor,
  PostSidebarAnchorLink,
  PostSidebarAnchors,
  PostSidebarAnchorsOpener,
  PostSidebarAnchorsWrapper,
  PostSidebarWrapper,
} from 'styles/Post/PostSideBar.style';
import empty from 'is-empty';
import useAnchorsLinks from 'hooks/useAnchorsLinks';
import throttle from 'lodash.throttle';
import { useSelector } from 'react-redux';
import { SidebarMenuSubitemIcon } from 'styles/Sidebar.style';

const PostSidebar = ({ headings = [], contentRef }) => {
  const [showAnchors, setShowAnchors] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const { headerSize } = useSelector((state) => state.sizes);
  const { handleClickAnchor } = useAnchorsLinks();

  useEffect(() => {
    if (!contentRef.current || empty(headings)) return;
    const anchors = Array.from(
      contentRef.current.querySelectorAll('.wp-block-heading'),
    );
    anchors.forEach((anchor, index) => {
      anchor.id = `title-${index + 1}`;
    });
  }, [headings]);

  useEffect(() => {
    if (empty(headings)) return;

    const anchorElements = headings.map((item) => document.getElementById(item.id));

    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;

      const activeAnchor = headings.find((_, index) => {
        const sectionElement = anchorElements[index];

        if (!sectionElement) return false;
        const nextSection = anchorElements[index + 1];
        const top = sectionElement.offsetTop - headerSize?.height - 20;
        const bottom = nextSection
          ? nextSection.offsetTop - headerSize?.height - 20
          : document.body.scrollHeight;

        return scrollPosition >= top && scrollPosition < bottom;
      });

      setActiveSection(activeAnchor?.id || null);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, headerSize]);

  const handleClickAnchorsOpener = useCallback(() => {
    setShowAnchors((prev) => !prev);
  }, []);

  return (
    <PostSidebarWrapper>
      <PostSidebarAnchorsOpener
        $hideOpener={showAnchors === true}
        onClick={handleClickAnchorsOpener}
      >
        <SidebarMenuSubitemIcon $open={showAnchors} />
        Table of contents
      </PostSidebarAnchorsOpener>
      <PostSidebarAnchorsWrapper $active={showAnchors}>
        <PostSidebarAnchors>
          {headings.map((anchor) => (
            <PostSidebarAnchor
              key={anchor.id}
              className={activeSection === anchor.id ? 'active' : ''}
            >
              <PostSidebarAnchorLink
                href={`#${anchor.id}`}
                onClick={(e) => handleClickAnchor(e, anchor.id)}
              >
                {anchor.title}
              </PostSidebarAnchorLink>
            </PostSidebarAnchor>
          ))}
        </PostSidebarAnchors>
      </PostSidebarAnchorsWrapper>
    </PostSidebarWrapper>
  );
};

export default PostSidebar;
