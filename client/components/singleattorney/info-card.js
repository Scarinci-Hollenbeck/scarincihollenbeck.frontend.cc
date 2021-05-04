import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

export default function SingleAttorneyInfoCard({
  fullName,
  chair,
  coChair,
  designation,
  offices,
  services,
}) {
  return (
    <div className="d-flex flex-column">
      <h1 className="animate__animated animate__fadeInDown animate__slow mb-0">
        <strong className="title text-white">{fullName}</strong>
      </h1>
      <h3 className="text-white mt-0 mb-2 animate__animated animate__fadeInUp animate__slow">
        {designation}
        <strong className="mx-2">|</strong>
        {chair.map((c, i) => (
          <Link href={c.link.replace('wp.', '')} key={c.title}>
            <a className="text-white">
              <strong>Chair</strong>
              {' '}
              {c.title}
              {i < chair.length - 1 && (
              <strong className="mx-2">|</strong>
              )}
            </a>
          </Link>
        ))}
        {coChair.map((c, i) => (
          <Link href={c.link.replace('wp.', '')} key={c.title}>
            <a className="text-white">
              <strong>Co-chair</strong>
              {' '}
              {c.title}
              {i < chair.length - 1 && (
              <strong className="mx-2">|</strong>
              )}
            </a>
          </Link>
        ))}
      </h3>
      <div className="w-100 d-block animate__animated animate__fadeInDown animate__slow redBanner" />
      <Row>
        <Col sm={12} className="mt-1 mb-0">
          <div className="mt-3 card px-3 pt-2 pb-0 rounded">
            <h3 className="animate__animated animate__fadeInUp animate__slow">
              <strong className="help">How I can help you</strong>
            </h3>
            <div className="d-flex flex-column flex-md-row border-top">
              <ul className="mr-4">
                {services.map(
                  (service, index) => index % 2 === 0 && (
                  <li key={service.title}>
                    <Link href={service.link}>
                      <a
                        className="d-block text-dark mb-1"
                        style={{ fontSize: '16px', lineHeight: 1.2 }}
                      >
                        {service.title}
                      </a>
                    </Link>
                  </li>
                  ),
                )}
              </ul>
              <ul>
                {services.map(
                  (service, index) => index % 2 !== 0 && (
                  <li key={service.title}>
                    <Link href={service.link}>
                      <a
                        className="d-block text-dark mb-1"
                        style={{ fontSize: '16px', lineHeight: 1.2 }}
                      >
                        {service.title}
                      </a>
                    </Link>
                  </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          a,
          h1,
          h2,
          h3,
          ul {
            font-size: 1.1rem;
          }
          u {
            font-size: 1rem;
          }

          ul {
            margin-left: -25px;
          }

          strong.help {
            font-size: 1.2rem;
          }

          .title {
            font-size: 2.2rem;
          }
          .redBanner {
            height: 3px;
            background-color: #db2220;
          }
        `}
      </style>
    </div>
  );
}
