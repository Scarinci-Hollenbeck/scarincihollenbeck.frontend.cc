import { useState } from 'react';
import ContactForm from '../../shared/ContactForm/ContactForm';
import {
  AboutAuthorFormCardContainer,
  ContactNowBtn,
  FormBox,
} from '../../../styles/AboutAuthorFormCard.style';
import ModalWindow from '../../common/ModalWindow';

const AboutAuthorFormCard = ({ blockName }) => {
  const [show, setShow] = useState(false);

  return (
    <AboutAuthorFormCardContainer className="d-print-none mt-4">
      <ContactNowBtn className="contact-now-btn" onClick={() => setShow(true)}>
        <span>Contact now</span>
      </ContactNowBtn>
      <ModalWindow isOpen={show} setOpenModal={setShow}>
        <FormBox>
          <h4>Let`s get in touch!</h4>
          <ContactForm blockName={blockName} />
        </FormBox>
      </ModalWindow>
    </AboutAuthorFormCardContainer>
  );
};

export default AboutAuthorFormCard;
