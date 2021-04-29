import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import ContactBtn from 'components/singleattorney/contact-btn';

export default function SingleAttorneyInfoCard({
  fullName,
  chair,
  coChair,
  designation,
  pdf,
  vizibility,
  services,
  offices,
}) {
  return (
    <div className="d-flex flex-column text-white">
      <h1
        className="animate__animated animate__fadeInDown animate__slow"
      >
        <strong className="title">{fullName}</strong>
      </h1>
      <div className="w-100 d-block animate__animated animate__fadeInDown animate__slow redBanner" />
      <Row>
        <Col sm={12} md={6} className="mt-3 mb-0">
          <h2 className="animate__animated animate__fadeInUp animate__slow">
            <strong>Title: </strong>
            {' '}
            {designation}
          </h2>
          {chair.length > 0 && (
            <h3
              className="text-white mt-2 animate__animated animate__fadeInUp animate__slow"
            >
              <strong>Chair: </strong>
              {' '}
              {chair.map((c, i) => (
                <Link href={c.link.replace('wp.', '')} key={c.title}>
                  <a className="text-white">
                    {c.title}
                    {i < chair.length - 1 && ', '}
                  </a>
                </Link>
              ))}
            </h3>
          )}
          {coChair.length > 0 && (
            <h3
              className="text-white animate__animated animate__fadeInUp animate__slow"
            >
              Co-chair:
              {' '}
              {coChair.map((c) => (
                <Link href={c.link.replace('wp.', '')} key={c.title}>
                  <a className="text-white" style={{ fontSize: '1.1rem' }}>
                    {c.title}
                  </a>
                </Link>
              ))}
            </h3>
          )}
          {offices && offices.length > 0 && (
            <h3
              className="animate__animated animate__fadeInUp animate__slow"
            >
              <strong>Office: </strong>
              {offices.map((office, index) => (
                <Link href={office.link} key={office.link}>
                  <a className="text-white" style={{ fontSize: '1.1rem' }}>
                    {office.name === 'Washington D.C.'
                      ? 'Washington, D.C.'
                      : office.name}
                    {index < offices.length - 1 && ', '}
                  </a>
                </Link>
              ))}
            </h3>
          )}
          <ul
            className="list-inline list-unstyled animate__animated animate__fadeInUp animate__slow"
          >
            {pdf && (
            <li className="list-inline-item mr-3">
              <a className="text-white" href={pdf} download>
                <strong>
                  <u>Download Biography</u>
                </strong>
                {' '}
              </a>
            </li>
            )}
            {vizibility && (
            <li className="list-inline-item">
              <a className="text-white" href={vizibility} download>
                <strong>
                  <u>Download Contact</u>
                </strong>
              </a>
            </li>
            )}
          </ul>
          
        </Col>
        <Col sm={12} md={6} className="mt-3 mb-0">
          {services.length > 0 && (
            <h3
              className="animate__animated animate__fadeInUp animate__slow"
            >
              <strong className="subTitle">How can I help you?</strong>
              <ul className="mt-2 ml-1 list-unstyled">
                {services.map((service) => (
                  <li key={service.link}>
                    <Link href={service.link}>
                      <a className="text-white mb-2 d-block service">
                        {service.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </h3>
          )}
        </Col>
      </Row>
      <style jsx>
        {`
        a, h1, h2, h3, ul {
          font-size: 1.1rem;
        }
        .title {
          font-size: 2.2rem;
        }
        .subTitle {
          font-size: 1.4rem;
        }
        .redBanner {
          height: 3px;
          background-color: #db2220;
        }
        .service {
          font-size: 16px;
        }        
      `}
      </style>
    </div>
  );
}
