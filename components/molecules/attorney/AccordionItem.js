import React from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionItem = ({
  eventKey, title, children, isNew, ...props
}) => (
  <Accordion.Item {...props} eventKey={eventKey}>
    <Accordion.Header as="h3">
      {isNew && <span className="accordion-new">New</span>}
      {title}
    </Accordion.Header>
    <Accordion.Body>{children}</Accordion.Body>
  </Accordion.Item>
);

export default AccordionItem;
