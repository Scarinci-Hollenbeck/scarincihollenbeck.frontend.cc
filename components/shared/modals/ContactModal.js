import ModalWindow from 'components/common/ModalWindow';
import React, { useEffect, useState } from 'react';
import {
  ContactModalBox,
  ContactModalHeader,
  ContactModalTitle,
  ContactModalWrapper,
} from 'styles/Modals.style';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { handleModalOpener } from '../../../redux/slices/modals.slice';

const ContactForm = dynamic(() => import('../ContactForm/ContactForm'));

const ContactModal = () => {
  const dispatch = useDispatch();
  const { isActiveModal, customModalClassName } = useSelector(
    (store) => store.modals,
  );
  const [noTransition, setNoTransition] = useState(true);
  const setIsShowContactModal = (value) => dispatch(handleModalOpener({ active: value }));

  useEffect(() => {
    if (isActiveModal) {
      setNoTransition(true);
      setTimeout(() => setNoTransition(false), 500);
    }
  }, [isActiveModal]);

  return (
    <ContactModalWrapper
      className={`${customModalClassName} ${
        noTransition ? 'no-transition' : ''
      }`}
    >
      <ModalWindow isOpen={isActiveModal} setOpenModal={setIsShowContactModal}>
        <ContactModalBox>
          <ContactModalHeader>
            <ContactModalTitle>Let`s get in touch!</ContactModalTitle>
          </ContactModalHeader>

          <ContactForm blockName="common-contact-form" />
        </ContactModalBox>
      </ModalWindow>
    </ContactModalWrapper>
  );
};

export default ContactModal;
