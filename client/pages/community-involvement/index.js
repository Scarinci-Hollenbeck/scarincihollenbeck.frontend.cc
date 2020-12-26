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
import SinglePracticeContent from 'components/singlepractice/content';
import SidebarContent from 'components/singlepractice/sidebar';
import CarouselsLatestNews from 'components/carousels/latest-news';
import SingleSubHeader from 'layouts/single-sub-header';
import client from 'utils/graphql-client';
import { getFirmPage } from 'queries/pages';
import { fetchFirmPosts } from 'utils/fetch-firm-posts';
import { firmResources } from 'utils/common-lists';
import tabStyle from 'styles/BigButtonTabs.module.css';
import lineHeaderStyles from 'styles/LineHeader.module.css';

export default function CommunityInvolvement({ page, posts }) {
  const relatedPages = [
    {
      id: 'SjveurE7BK1R1l2',
      title: 'Diversity Group',
      uri: '/diversity-group',
    },
    {
      id: 'WF7jMpVJP3PTnuP',
      title: 'Pro Bono',
      uri: '/pro-bono',
    },
    {
      id: 'vehm0rQb7cpMH92',
      title: 'Women Lead',
      uri: '/women-lead',
    },
  ];

  return (
    <>
      <NextSeo
        title={page.seo.title}
        description={page.seo.metaDesc}
        canonical="http://scarincihollenbeck.com/community-involvement"
      />
      <SingleSubHeader
        image="/images/City-Night-Background-1800x400-JPG.jpg"
        title={page.title}
        subtitle={page.FirmPagesContentDescription.description}
        height="400px"
      />
      <TabContainer
        className="mb-0"
        id="nav-tab"
        defaultActiveKey={page.FirmPagesContentTabs.tabHeader}
      >
        <Container>
          <Row>
            <Col sm={12}>
              <Nav>
                {page.FirmPagesContentTabs.tabHeader && (
                  <Nav.Link
                    eventKey={page.FirmPagesContentTabs.tabHeader}
                    className={tabStyle.tab}
                  >
                    {page.FirmPagesContentTabs.tabHeader}
                  </Nav.Link>
                )}
                {page.FirmPagesContentTabs.tab2Header && (
                  <Nav.Link
                    eventKey={page.FirmPagesContentTabs.tab2Header}
                    className={tabStyle.tab}
                  >
                    {page.FirmPagesContentTabs.tab2Header}
                  </Nav.Link>
                )}
                {page.FirmPagesContentTabs.tab3Header && (
                  <Nav.Link
                    eventKey={page.FirmPagesContentTabs.tab3Header}
                    className={tabStyle.tab}
                  >
                    {page.FirmPagesContentTabs.tab3Header}
                  </Nav.Link>
                )}
                {page.FirmPagesContentTabs.tab4Header && (
                  <Nav.Link
                    eventKey={page.FirmPagesContentTabs.tab4Header}
                    className={tabStyle.tab}
                  >
                    {page.FirmPagesContentTabs.tab4Header}
                  </Nav.Link>
                )}
                {page.FirmPagesContentTabs.tab5Header && (
                  <Nav.Link
                    eventKey={page.FirmPagesContentTabs.tab5Header}
                    className={tabStyle.tab}
                  >
                    {page.FirmPagesContentTabs.tab5Header}
                  </Nav.Link>
                )}
              </Nav>
            </Col>
            <Col sm={12} md={8}>
              {page.FirmPagesContentTabs.tabContent && (
                <TabContent key={page.FirmPagesContentTabs.tabHeader}>
                  <SinglePracticeContent
                    tabTitle={page.FirmPagesContentTabs.tabHeader}
                    title={page.FirmPagesContentTabs.tabHeader}
                    content={page.FirmPagesContentTabs.tabContent}
                  />
                </TabContent>
              )}
              {page.FirmPagesContentTabs.tab2Content && (
                <TabContent key={page.FirmPagesContentTabs.tab2Header}>
                  <SinglePracticeContent
                    tabTitle={page.FirmPagesContentTabs.tab2Header}
                    title={page.FirmPagesContentTabs.tab2Header}
                    content={page.FirmPagesContentTabs.tab2Content}
                  />
                </TabContent>
              )}
              {page.FirmPagesContentTabs.tab3Content && (
                <TabContent key={page.FirmPagesContentTabs.tab3Header}>
                  <SinglePracticeContent
                    tabTitle={page.FirmPagesContentTabs.tab3Header}
                    title={page.FirmPagesContentTabs.tab3Header}
                    content={page.FirmPagesContentTabs.tab3Content}
                  />
                </TabContent>
              )}
              {page.FirmPagesContentTabs.tab4Content && (
                <TabContent key={page.FirmPagesContentTabs.tab4Header}>
                  <SinglePracticeContent
                    tabTitle={page.FirmPagesContentTabs.tab4Header}
                    title={page.FirmPagesContentTabs.tab4Header}
                    content={page.FirmPagesContentTabs.tab4Content}
                  />
                </TabContent>
              )}
              {page.FirmPagesContentTabs.tab5Content && (
                <TabContent key={page.FirmPagesContentTabs.tab5Header}>
                  <SinglePracticeContent
                    tabTitle={page.FirmPagesContentTabs.tab5Header}
                    title={page.FirmPagesContentTabs.tab5Header}
                    content={page.FirmPagesContentTabs.tab5Content}
                  />
                </TabContent>
              )}
              <>
                <div className={lineHeaderStyles.lineHeader}>
                  <h3>Recent from the firm</h3>
                </div>
                <div className="my-5">
                  <CarouselsLatestNews slides={posts} />
                </div>
              </>
            </Col>
            <Col sm={12} md={3}>
              <SimpleSearch />
              <SubscriptionMessage />
              <SidebarContent
                title="Diversity"
                content={relatedPages}
                tabKey={2}
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
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await client.query(getFirmPage('community-involvement'), {});
  const posts = fetchFirmPosts();

  return {
    props: {
      page: res.data.pages.nodes[0],
      posts,
    },
    revalidate: 1,
  };
}
