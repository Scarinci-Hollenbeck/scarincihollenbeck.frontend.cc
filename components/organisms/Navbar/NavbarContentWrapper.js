import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import React, { useState } from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import { NavbarItemContent } from 'styles/Navigation.style';

const NavbarItemContentMotion = motion.create(NavbarItemContent);

// The panel clips its content while it grows or shrinks and lets dropdowns
// (attorney filters) overflow once it is fully open. overflow is toggled with
// a class instead of framer-motion's transitionEnd: framer-motion 12 never
// renders a value that first appears in transitionEnd, and it applies string
// values like overflow instantly, ignoring a per-value delay. The class lives
// in a child so useIsPresent can drop it as soon as the exit animation starts
// (AnimatePresence keeps rendering the exiting element with its old props).
const NavbarPanel = ({ children, handlerContainer, customClass }) => {
  const isPresent = useIsPresent();
  const [isOpened, setIsOpened] = useState(false);
  const isExpanded = isPresent && isOpened;

  return (
    <NavbarItemContentMotion
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      onAnimationComplete={(definition) => setIsOpened(definition?.height === 'auto')}
      onClick={(e) => handlerContainer && handlerContainer(e)}
      className={`navbar-content ${
        isExpanded ? 'is-expanded' : ''
      } ${customClass}`}
    >
      {children}
    </NavbarItemContentMotion>
  );
};

const NavbarContentWrapper = ({
  children,
  id,
  showNavContent,
  handlerContainer,
  customClass = '',
  isHideContainer = false,
}) => (
  <AnimatePresence>
    {showNavContent && (
      <NavbarPanel
        key={`${id}-navbar-content`}
        handlerContainer={handlerContainer}
        customClass={customClass}
      >
        {isHideContainer ? (
          children
        ) : (
          <ContainerDefault className="navbar-container">
            {children}
          </ContainerDefault>
        )}
      </NavbarPanel>
    )}
  </AnimatePresence>
);

export default NavbarContentWrapper;
