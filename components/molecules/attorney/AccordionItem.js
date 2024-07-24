import React from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionItem = ({
  eventKey, title, children, ...props
}) => (
  <Accordion.Item {...props} eventKey={eventKey}>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>{children}</Accordion.Body>
  </Accordion.Item>
);

export default AccordionItem;
