import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import ProfileTitle from 'components/molecules/admin/ProfileTitle';
import ProfileDetails from 'components/molecules/admin/ProfileDetails';
import ContactIcons from 'components/molecules/admin/ContactIcons';
import { formatSrcToCloudinaryUrl } from 'utils/helpers';
import { BackgroundContainer } from 'styles/SingleSubHeader.style';

const AdminProfileHeader = ({ image, profile }) => {
  const {
    name, designation, offices, phoneNumber, email, vizibility, socialMedia,
  } = profile;

  const contact = { phoneNumber, email };

  const linkedIn = socialMedia.filter((a) => a.channel === 'LinkedIn')[0];
  return (
    <>
      <BackgroundContainer>
        <Container>
          <Row className="my-4">
            <Col sm={12} lg={9}>
              <Row>
                <Col sm={12} md={4}>
                  <Image
                    src={formatSrcToCloudinaryUrl(image)}
                    alt={profile.name}
                    width={743}
                    height={795}
                    layout="intrinsic"
                    quality={100}
                    className="animate__animated animate__fadeInUp animate__fast"
                    priority
                    loading="eager"
                  />
                </Col>
                <Col sm={12} md={8} lg={7}>
                  <div className="my-3">
                    <ProfileTitle name={name} designation={designation} chair={[]} coChair={[]} />
                    <div className="d-flex flex-column flex-md-row mt-3">
                      <ProfileDetails offices={offices} contact={contact} fax="" />
                      <ContactIcons slug="" linkedIn={linkedIn} pdf="" vizibility={vizibility} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default AdminProfileHeader;
