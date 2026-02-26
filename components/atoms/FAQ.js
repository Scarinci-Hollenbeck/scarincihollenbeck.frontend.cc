import Accordion from 'react-bootstrap/Accordion';
import { FaqWrapper } from 'styles/Faq.style';
import { DEFAULT_FIRM_FAQ } from 'utils/constants';
import empty from 'is-empty';
import { Title32 } from 'styles/common/Typography.style';
import { JSXWithDynamicLinks } from './micro-templates/JSXWithDynamicLinks';

export default function FAQ({
  faqArrContent,
  title,
  anchorId,
  allOpen = false,
  isTwoColumns,
  isSingleOpened = false,
}) {
  const faqItems = faqArrContent || DEFAULT_FIRM_FAQ;

  const activeKeys = allOpen ? faqItems.map(({ title }) => title) : ['0'];

  return (
    <FaqWrapper
      className={`margin-scroll ${isTwoColumns ? 'two-columns' : ''}`}
      id={anchorId}
      data-testid="faq-wrapper"
    >
      <Title32>
        {`${
          !empty(title) && !empty(faqArrContent) ? `FAQ about ${title}` : 'FAQ'
        }`}
      </Title32>
      <Accordion defaultActiveKey={activeKeys} alwaysOpen={!isSingleOpened}>
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
    </FaqWrapper>
  );
}
