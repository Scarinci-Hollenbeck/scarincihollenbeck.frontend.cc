import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Title60 } from 'styles/common/Typography.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  FAQHolder,
  FAQSection,
  FAQText,
} from 'styles/industries/IndustryFaq.style';
import { DEFAULT_FIRM_FAQ } from 'utils/constants';

const IndustryFaq = ({ faqList, isSingleOpened = false, anchorId }) => {
  const faqItems = faqList || DEFAULT_FIRM_FAQ;
  return (
    <FAQSection id={anchorId} className="margin-scroll">
      <ContainerDefault>
        <FAQHolder>
          <FAQText>
            <Title60>
              Frequently Asked
              <strong> Questions</strong>
            </Title60>
          </FAQText>
          <Accordion defaultActiveKey={0} alwaysOpen={!isSingleOpened}>
            {faqItems.map(({ title, description }) => (
              <Accordion.Item key={title} eventKey={title}>
                <Accordion.Header as="h3">{title}</Accordion.Header>
                <Accordion.Body>
                  {typeof description !== 'string' ? (
                    description
                  ) : (
                    <JSXWithDynamicLinks HTML={description} />
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </FAQHolder>
      </ContainerDefault>
    </FAQSection>
  );
};

export default IndustryFaq;
