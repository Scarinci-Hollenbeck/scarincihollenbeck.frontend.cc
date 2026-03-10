import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import ContactForm from 'components/shared/ContactForm/ContactForm';
import Image from 'next/image';
import React from 'react';
import { Title32 } from 'styles/common/Typography.style';
import {
  ContactFormWrapper,
  ContactHolder,
  ContactItem,
  ContactItemImage,
  ContactItems,
  ContactItemText,
  ContactItemTitle,
  ContactSection,
} from 'styles/ContactUs.style';
import { ContainerDefault } from 'styles/Containers.style';
import { tileContentArr } from 'utils/tileContent';

const ContactBlock = () => (
  <ContactSection>
    <ContainerDefault>
      <ContactHolder>
        <ContactItems>
          {tileContentArr?.map((tile) => (
            <ContactItem href={tile?.link} key={tile?.id}>
              <ContactItemTitle>{tile?.title}</ContactItemTitle>

              <ContactItemText>
                <JSXWithDynamicLinks HTML={tile?.textContent} />
              </ContactItemText>
              <ContactItemImage>
                <Image src={tile?.image} alt={tile?.title} fill quality={75} />
              </ContactItemImage>
            </ContactItem>
          ))}
        </ContactItems>

        <ContactFormWrapper>
          <Title32>Let’s get in touch!</Title32>
          <ContactForm buttonText="Send" blockName="contact-us-contact-form" />
        </ContactFormWrapper>
      </ContactHolder>
    </ContainerDefault>
  </ContactSection>
);

export default ContactBlock;
