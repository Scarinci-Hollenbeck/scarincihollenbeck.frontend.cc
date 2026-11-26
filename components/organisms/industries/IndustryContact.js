import React from 'react';
import ContactForm from 'components/shared/ContactForm/ContactForm';
import { Title32 } from 'styles/common/Typography.style';
import { IndustryContactCard } from 'styles/IndustryContact.style';

/**
 * The contact form beside the sign up at the end of an industry page: the
 * same form as on Contact Us, so messages arrive the same way.
 */
const IndustryContact = () => (
  <IndustryContactCard>
    <Title32>Let’s get in touch!</Title32>
    <ContactForm buttonText="Send" blockName="industry-contact-form" />
  </IndustryContactCard>
);

export default IndustryContact;
