import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import BarLoader from 'react-spinners/BarLoader';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Footer from '../../components/footer';
import MultiSubHeader from '../../layouts/multi-sub-header';
import NoHeaderMiniSidebar from '../../layouts/no-header-mini-sidebar';
import FullWidth from '../../layouts/full-width';
import ProfileImage from '../../components/singleattorney/profile-image';
import InfoCard from '../../components/singleattorney/info-card';
import Biography from '../../components/singleattorney/biography';
import Matters from '../../components/singleattorney/matters';
import TableTab from '../../components/singleattorney/table';
import Articles from '../../components/singleattorney/articles';
import VideoTab from '../../components/singleattorney/video-content';
import BasicContent from '../../components/singleattorney/basic-content';
import SidebarContent from '../../components/singleattorney/sidebar';
import FeaturedSlider from '../../components/singleattorney/featured-slider';
import RelatedArticles from '../../components/singleattorney/related-articles';
import { sortByDateKey, urlify, headers, addRandomKey } from '../../utils/helpers';
import { attorneyHeaderJPG } from '../../utils/next-gen-images';


export default function Attorney({slides, bio }) {
  const router = useRouter();
  let newsEventArticles = [];
  let filterHeaders;
  let filterBody;

  if(bio !== undefined) {
    if (bio.newsPosts !== undefined && bio.eventPosts !== undefined) {
      newsEventArticles = [...bio.newsPosts, ...bio.eventPosts];
    }
    
    // filter empty tabs
    if (bio.tabs !== undefined) {
      const { headers, body } = bio.tabs;
      filterHeaders = headers.filter((a) => typeof a !== 'number');
      filterBody = body.filter((a) => a[1] !== '');
    }
  }
  
  return (
    <>
      {(router.isFallback) ? (
          <Container>
            <Row id="page-loader-container" className="justify-content-center align-self-center">
              <BarLoader color={"#DB2220"} />
            </Row>
          </Container>
        ) : (
          <>
              <NextSeo
                title={bio.seo.title}
                description={bio.seo.metaDescription}
                canonical={`https://scarincihollenbeck.com/attorney/${bio.seo.canonicalLink}`}
                openGraph={{
                  url: `https://scarincihollenbeck.com/attorney/${bio.seo.canonicalLink}`,
                  title: 'Scarinci Hollenbeck',
                  description:bio.seo.metaDescription,
                  images: [
                    {
                      url: bio.seo.featuredImg,
                      width: 200,
                      height: 220,
                      alt: bio.seo.title,
                    }
                  ],
                  site_name: 'Scarinci Hollenbeck',
                }}
                twitter={{
                  handle: '@S_H_Law',
                  site: `https://scarincihollenbeck.com/attorney/${bio.seo.canonicalLink}`,
                  cardType: bio.seo.metaDescription,
                }}
              />
              <SocialProfileJsonLd
                type="Person"
                name={bio.seo.fullName}
                url={`https://scarincihollenbeck.com/${bio.seo.canonicalLink}`}
                sameAs={bio.seo.socialMedia}
              />
              <div id="single-attorney">
              <MultiSubHeader        
                image={attorneyHeaderJPG}
                profile={( <ProfileImage image={bio.profileImage} name={bio.fullName} /> )}
                height="auto"
                infoCard={(
                  <InfoCard
                    fullName={bio.fullName}
                    chair={bio.chair}
                    designation={bio.designation}
                    phoneNumber={bio.phoneNumber}
                    fax={bio.fax}
                    email={bio.email}
                    socialMediaLinks={bio.socialMediaLinks}
                    pdf={bio.pdf}
                    vizibility={bio.vizibility}
                  />
                )}
              />
              <TabContainer className="mb--1" id="nav-tab" defaultActiveKey="biography">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <Nav>
                        <Nav.Link eventKey="biography" className="main-tab">Biography</Nav.Link>
                        { (bio.representativeMatters) && <Nav.Link eventKey="representative-matters" className="main-tab">Representative Matters</Nav.Link> }
                        { (bio.representativeClients) && <Nav.Link eventKey="represntative-clients" className="main-tab">Representative Clients</Nav.Link> }
                        { (bio.presentations) && <Nav.Link eventKey="presentations" className="main-tab">Presentations</Nav.Link> }
                        { (bio.publications) && <Nav.Link eventKey="publications" className="main-tab">Publications</Nav.Link> }
                        { (bio.media) && <Nav.Link eventKey="media" className="main-tab">Media</Nav.Link> }
                        { (bio.blogPosts.length > 0) && <Nav.Link eventKey="blogs" className="main-tab">Articles</Nav.Link>}
                        { (newsEventArticles.length > 0) && (newsEventArticles !== undefined) && <Nav.Link eventKey="newsevents" className="main-tab">News &amp; Events</Nav.Link> }
                        { (bio.videos) && <Nav.Link eventKey="videos" className="main-tab">Videos</Nav.Link> }
                        { (bio.tabs) && filterHeaders.map((value) => <Nav.Link key={urlify(value)} eventKey={urlify(value)} className="main-tab">{value}</Nav.Link>) } 
                      </Nav>       
                    </Col>
                    <Col sm={12} md={9} className="mt-4">
                      <TabContent>
                        <Biography tabTitle="biography" title="Biography" content={bio.biography} />
                      </TabContent>              
                      {(bio.representativeMatters) && (
                        <TabContent>
                          <Matters tabTitle="representative-matters" title="Representative Matters" content={bio.representativeMatters} />
                        </TabContent>
                      )}
                      {(bio.representativeClients) &&  (
                        <TabContent>
                          <Matters tabTitle="representative-clients" title="Representative Clients" content={bio.representativeClients} />
                        </TabContent>
                      )}
                      {(bio.presentations) &&  (
                        <TabContent>
                          <TableTab tabTitle="presentations" title="Presentations" content={bio.presentations} />
                        </TabContent>
                      )}
                      {(bio.publications) && (
                        <TabContent>
                          <TableTab tabTitle="publications" title="Publications" content={bio.publications} />
                        </TabContent>
                      )}
                      {(bio.media) && (
                        <TabContent>
                          <TableTab tabTitle="media" title="Media" content={bio.media} />
                        </TabContent>
                      )}
                      {(bio.blogPosts.length > 0) && (
                        <TabContent>
                          <Articles tabTitle="blogs" title="Articles" content={sortByDateKey(bio.blogPosts, 'date')} />
                        </TabContent>
                      )}
                      {(newsEventArticles.length > 0) && (newsEventArticles !== undefined) && (
                        <TabContent>
                          <Articles tabTitle="newsevents" title="News &amp; Events" content={newsEventArticles} />
                        </TabContent>
                      )}
                      {(bio.videos) && (
                        <TabContent>
                          <VideoTab title="Videos" content={bio.videos} tabTitle="videos" />
                        </TabContent>
                      )}
                      {(bio.tabs) &&  (
                        <TabContent>
                          {filterBody.map((b) => <BasicContent key={addRandomKey(b[1])} title={b[1]} content={b[2]} tabTitle={urlify(b[1])} />)}
                        </TabContent>
                      )}
                      { (bio.clients) && (bio.clients.length > 0) && <FeaturedSlider content={bio.clients} title="Clients" />}
                      { (bio.awards) && (bio.awards.length > 0) && <FeaturedSlider content={bio.awards} title="Awards" />}
                      { (newsEventArticles.length > 0) && <RelatedArticles title="News & Events" content={newsEventArticles} /> }
                      { (bio.blogPosts) && (bio.blogPosts.length > 0) && <RelatedArticles title="Recent Articles" content={sortByDateKey(bio.blogPosts, 'date')} />} 
                    </Col>
                    <Col sm={12} md={3} className="mt-4">
                      <SidebarContent
                        title="Related Practices"
                        content={bio.relatedPractices}
                        itemKey={0}
                      />
                      <br />
                      <SidebarContent
                        title="Additional Information"
                        content={bio.sidebar}
                        itemKey={1}
                      />
                    </Col>     
                  </Row>
                </Container>
              </TabContainer>
                  
              </div>
              <Footer slides={slides} />
          </>
        )}
    </>
  )


}

export async function getStaticPaths() {
  const attorneysResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/attorney-search/attorneys`, { headers });
  const attorneys = await attorneysResponse.json();

  return  {
    paths: attorneys.map(attorney => `/attorney${attorney.link}`) || [],
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  const [ bio, slides] = await Promise.all([
    fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/individual-attorney/attorney/${params.slug}`, { headers }).then(data => data.json()),
    fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/just-in/posts`, { headers }).then(data => data.json())
  ]);

  return {
    props: {
      slides,
      bio
    },
  }
}