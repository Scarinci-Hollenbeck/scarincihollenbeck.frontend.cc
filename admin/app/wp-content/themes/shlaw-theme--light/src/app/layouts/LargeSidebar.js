import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function LargeSidebar(props) {
  const { body, sidebar } = props;

  return (
    <Container>
      <Row>
        <Col sm={12} md={8}>
          {body}
        </Col>
        <Col sm={12} md={4}>
          {sidebar}
        </Col>
      </Row>
    </Container>
  )
}