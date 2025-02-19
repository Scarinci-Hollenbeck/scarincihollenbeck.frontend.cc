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

const PostSidebar = ({ content, contentRef }) => {
  const [showAnchors, setShowAnchors] = useState(true);
  const [anchorsList, setAnchorsList] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const { headerSize } = useSelector((state) => state.sizes);
  const { handleClickAnchor } = useAnchorsLinks();

  useEffect(() => {
    if (!contentRef.current) return;

    const anchors = Array.from(
      contentRef.current.querySelectorAll('.wp-block-heading'),
    );
    if (empty(anchors)) {
      setAnchorsList([]);
      return;
    }

    anchors.forEach((anchor, index) => (anchor.id = `title-${index + 1}`));

    const anchorsData = anchors.map((anchor) => ({
      id: anchor.id,
      title: anchor.textContent,
    }));

    setAnchorsList(anchorsData);
  }, [content]);

  useEffect(() => {
    if (empty(anchorsList)) return;
    // if (window && window?.innerWidth <= 992) {
    //   setActiveSection(null);
    //   return;
    // }

    const anchorElements = anchorsList.map((item) => document.getElementById(item.id));

    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;

      const activeAnchor = anchorsList.find((_, index) => {
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
  }, [anchorsList, headerSize]);

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
          {anchorsList?.map((anchor) => (
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
