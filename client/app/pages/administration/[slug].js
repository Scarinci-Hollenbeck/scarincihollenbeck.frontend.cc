import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import BarLoader from 'react-spinners/BarLoader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../../components/footer';
import ProfileImage from '../../components/administration/profile-image';
import InfoCard from '../../components/administration/info-card';
import MultiSubHeader from '../../layouts/multi-sub-header';
import FullWidth from '../../layouts/full-width';
import { headers, createMarkup } from '../../utils/helpers';
import { attorneyHeaderJPG } from '../../utils/next-gen-images';


export default function SingleAdmin({ slides, adminJson }) {
  const router = useRouter();

  return (
    <>
      {(router.isFallback) ? (
        <Container>
          <Row id="page-loader-container" className="justify-content-center align-self-center">
            <BarLoader color="#DB2220" />
          </Row>
        </Container>

      ) : (
        <>
          <NextSeo
            title={adminJson.seo.title}
            description={adminJson.seo.metaDescription}
            canonical={`https://scarincihollenbeck.com/${adminJson.seo.canonicalLink}`}
            openGraph={{
              url: `https://scarincihollenbeck.com/${adminJson.seo.canonicalLink}`,
              title: 'Scarinci Hollenbeck',
              description: adminJson.seo.metaDescription,
              images: [
                {
                  url: adminJson.seo.featuredImg,
                  width: 200,
                  height: 220,
                  alt: adminJson.seo.title,
                },
              ],
              site_name: 'Scarinci Hollenbeck',
            }}
            twitter={{
              handle: '@S_H_Law',
              site: `https://scarincihollenbeck.com/${adminJson.seo.canonicalLink}`,
              cardType: adminJson.seo.metaDescription,
            }}
          />
          <SocialProfileJsonLd
            type="Person"
            name={adminJson.seo.name}
            url={`https://scarincihollenbeck.com/${adminJson.seo.canonicalLink}`}
            sameAs={[
              'https://twitter.com/S_H_Law',
              'https://www.facebook.com/ScarinciHollenbeck/',
              'https://www.linkedin.com/company/scarinci-hollenbeck-llc/',
            ]}
          />
          <div id="single-admin">
            <MultiSubHeader
              image={attorneyHeaderJPG}
              height="450px"
              profile={(<ProfileImage image={adminJson.image} name={adminJson.name} />)}
              infoCard={(
                <InfoCard
                  name={adminJson.name}
                  title={adminJson.Title}
                  phone_extension={adminJson.phone_extension}
                  email={adminJson.email}
                  social_media_links={adminJson.social_media_links}
                  vizibility={adminJson.vizibility}
                />
            )}
            />
            <FullWidth>
              <div>
                <div className="line-header">
                  <h3>Biography</h3>
                </div>
                <div className="w-100 mt-5">
                  <div dangerouslySetInnerHTML={createMarkup(adminJson.biography)} />
                </div>
              </div>
            </FullWidth>
          </div>
          <Footer slides={slides} />
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const adminsResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/admin-search/admin`, { headers });
  const json = await adminsResponse.json();

  return {
    paths: json.admins.map((admin) => admin.link) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [adminJson, slides] = await Promise.all([
    fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/individual-admin/admin/${params.slug}`, { headers }).then((data) => data.json()),
    fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/just-in/posts`, { headers }).then((data) => data.json()),
  ]);

  return {
    props: {
      slides,
      adminJson,
    },
  };
}
