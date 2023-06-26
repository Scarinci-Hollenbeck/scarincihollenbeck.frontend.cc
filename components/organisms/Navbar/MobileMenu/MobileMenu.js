/* eslint-disable */
// file has strange eslint error. Without any problems
import React, { useState } from 'react';
import Link from 'next/link';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import { SITE_NAVIGATION } from 'utils/constants';
import { AccordionStyled, BurgerBtn, ButtonLinkBox, NavList, OffcanvasBody } from 'styles/MobileMenu.style';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGrayLink from './ButtonGrayLink';
import LinkButtons from '../LinkButtons';

const MobileMenu = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {show ? (
        <BurgerBtn onClick={handleClose} aria-label="mobile menu">
          <IoCloseSharp className="icon" />
        </BurgerBtn>
      ) : (
        <BurgerBtn onClick={handleShow} aria-label="mobile menu">
          <IoMenuSharp className="icon" />
        </BurgerBtn>
      )}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton />
        <OffcanvasBody>
          <NavList>
            {SITE_NAVIGATION.map(({ id, label, children, slug }) => (
              <li key={id}>
                {children?.length > 0 ? (
                  <AccordionStyled>
                    <Accordion.Item eventKey={slug}>
                      <Accordion.Header as="h4">{slug.length > 0 ? <Link href={slug}>{label}</Link> : label}</Accordion.Header>
                      {children?.length > 0 && (
                        <Accordion.Body>
                          <ul>
                            {children.map((link) => (
                              <li key={link.id}>
                                <ButtonGrayLink closeMenu={handleClose} text={link.label} slug={link.slug} />
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      )}
                    </Accordion.Item>
                  </AccordionStyled>
                ) : (
                  <ButtonGrayLink key={id} closeMenu={handleClose} text={label} slug={slug} />
                )}
              </li>
            ))}
          </NavList>
          <ButtonLinkBox>
            <LinkButtons handleClickAndClose={handleClose} />
          </ButtonLinkBox>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default MobileMenu;
