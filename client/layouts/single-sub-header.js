import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createMarkup } from 'utils/helpers';
import styles from 'styles/Banner.module.css';

export default function SingleSubHeader({
  title, subtitle, isBlog, isHoliday, span, offset,
}) {
  return (
    <div className={!isHoliday ? styles.backPageBanner : styles.holidayBanner}>
      <Container className={(span === 9 && !isBlog) ? styles.tabBanner : styles.noTabBanner}>
        <Row>
          <Col sm={12} md={{ span, offset }}>
            <h1
              className="text-white mb-0 animate__animated animate__fadeInDown animate__fast"
              style={{
                fontSize: !isBlog ? '3rem' : null,
                textShadow: '2px 3px 3px #000',
              }}
            >
              <strong>{title}</strong>
            </h1>
            <div
              className="w-100 d-block my-2 animate__animated animate__fadeInDown animate__fast"
              style={{
                height: '3px',
                backgroundColor: '#db2220',
              }}
            />
            <h2
              className="my-3 text-white animate__animated animate__fadeInUp animate__fast"
              style={{ fontSize: '1.2rem' }}
              dangerouslySetInnerHTML={createMarkup(subtitle)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
