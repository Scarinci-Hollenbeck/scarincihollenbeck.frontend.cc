import ContactForm from 'components/shared/ContactForm/ContactForm';
import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  ContactFormHolder,
  ContactFormWrapper,
} from 'styles/HomeContactForm.style';
import { Title32 } from 'styles/common/Typography.style';

const HomeContactForm = () => (
  <ContactFormWrapper>
    <ContainerDefault>
      <ContactFormHolder>
        <Title32>Let’s get in touch!</Title32>
        <ContactForm buttonText="Send" blockName="homepage-contact-form" />
      </ContactFormHolder>
    </ContainerDefault>
  </ContactFormWrapper>
);

export default HomeContactForm;
