
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from 'components/footer';
import SimpleSearch from 'components/simple-search';
import SubscriptionMessage from 'components/subscription-message';
import PracticeContent from 'components/practice/content';
import FeaturedSlider from 'components/practice/featured-slider';
import RelatedAttorneys from 'components/practice/related-attorneys';
import SidebarContent from 'components/practice/sidebar';
import SingleSubHeader from 'layouts/single-sub-header';
import { headers, urlify, makeTitle } from 'utils/helpers';

export default function WomenLead({
  attorneysMentioned,
  title,
  description,
  tabs,
  members,
  chair,
  relatedPages,
  seo,
}) {
  const router = useRouter();

  const fullRelatedPages = relatedPages.map((page) => ({
    title: makeTitle(page),
    slug: page,
  }));

  const firmResources = [
    {
      title: 'Firm News',
      slug: '/category/firm-news',
    },
    {
      title: 'Firm Events',
      slug: '/category/firm-events',
    },
    {
      title: 'Firm Insights',
      slug: '/category/firm-insights',
    },
  ];

  function handleLink(e) {
    router.push(e.target.value);
  }

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.metaDescription}
        canonical={`http://scarincihollenbeck.com/${seo.canonicalLink}`}
      />
      <SingleSubHeader
        image="https://shhcsgmvsndmxmpq.nyc3.digitaloceanspaces.com/2020/05/City-Night-Background-1800x400-JPG.jpg"
        title={title}
        subtitle={description}
      />
      <div id="single-practice">
        <TabContainer
          className="mb--1"
          id="nav-tab"
          defaultActiveKey={urlify(tabs[0].title)}
        >
          <Container>
            <Row>
              <Col sm={12}>
                <Nav>
                  {tabs.length > 0
                    && tabs.map((tab) => (
                      <Nav.Link
                        eventKey={urlify(tab.title)}
                        key={tab.title}
                        className="main-tab"
                      >
                        {tab.title}
                      </Nav.Link>
                    ))}
                </Nav>
              </Col>
              <Col sm={12} md={9} className="mt-4">
                {tabs.length > 0
                  && tabs.map((tab) => (
                    <TabContent key={tab.title}>
                      <PracticeContent
                        tabTitle={urlify(tab.title)}
                        title={tab.title}
                        content={tab.content}
                      />
                    </TabContent>
                  ))}
                {/* Related Articles tab */}
                {/* Attorney list */}
                <RelatedAttorneys
                  title="Group Leader"
                  members={members.length > 0 ? members : []}
                  chair={chair.length > 0 ? chair : []}
                  handleLink={handleLink}
                />
                {/** Recent Blog Articles */}
                {attorneysMentioned.length > 0 && (
                  <div className="w-100 d-block">
                    <div className="line-header">
                      <h3>
                        Latest From
                        {title}
                      </h3>
                    </div>
                    <FeaturedSlider content={attorneysMentioned} />
                  </div>
                )}
              </Col>
              <Col sm={12} md={3}>
                <SimpleSearch />
                <SubscriptionMessage />
                <SidebarContent
                  title="Diversity"
                  content={fullRelatedPages}
                  tabKey={0}
                />
                <SidebarContent
                  title="Firm Resources"
                  content={firmResources}
                  tabKey={1}
                />
              </Col>
            </Row>
          </Container>
        </TabContainer>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const [page] = await Promise.all([
    fetch(
      `${process.env.REACT_APP_WP_BACKEND}/wp-json/firm-page/page/diversity-group`,
      { headers },
    ).then((data) => data.json()),
  ]);
  const {
    attorneysMentioned,
    title,
    description,
    tabs,
    members,
    relatedPages,
    seo,
  } = page;

  return {
    props: {
      attorneysMentioned,
      title,
      description,
      tabs,
      members: members.member || [],
      chair: members.chair || [],
      relatedPages,
      seo,
    },
  };
}
