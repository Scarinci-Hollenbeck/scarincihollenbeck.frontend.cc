import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Container from 'react-bootstrap/Container';
import NewDawnHeader from 'components/frontpage/new-dawn-header';
import ColumnContent from 'components/frontpage/column-content';
import FullWidthContent from 'components/frontpage/full-width-content';
import Footer from 'components/footer';
import { sortByKey } from 'utils/helpers';
import { buildBusinessSchema } from 'utils/json-ld-schemas'
import client from 'utils/graphql-client';
import { metaDataQuery, firmNewsQuery, firmEventsQuery, officeLocationsQuery, corePracticesQuery } from 'queries/home';

export default function Home({
  seo,
  posts,
  locations,
  corePractices
}) {
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.metaDesc}
        canonical="https://scarincihollenbeck.com/"
        openGraph={{
          type: 'website',
          url: 'https://scarincihollenbeck.com/',
          title: 'Scarinci Hollenbeck',
          description: seo.metaDesc,
          images: [
            {
              url: 'https://shhcsgmvsndmxmpq.nyc3.digitaloceanspaces.com/2018/05/no-image-found-diamond.png',
              width: 750,
              height: 350,
              alt: 'Scarinci Hollenbeck',
            },
          ],
          site_name: 'Scarinci Hollenbeck',
        }}
        twitter={{
          handle: '@S_H_Law',
          site: 'https://scarincihollenbeck.com',
          cardType: 'With a growing practice of more than 70+ experienced attorneys, Scarinci Hollenbeck is an alternative to a National 250 law firm.',
        }}
      />
      <Head>
        <script
          key="ScarinciHollenbeck"
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBusinessSchema()) }}
        />
      </Head> 
      <NewDawnHeader />
      <Container>      
        <ColumnContent corePractices={sortByKey(corePractices, 'title')} />
        <FullWidthContent
          sortedPosts={sortByKey(posts, 'date')}
          sortedLocations={sortByKey(locations, 'id')}
        />
      </Container>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  /** Adding in graphql queries */
  const metaDataContent = await client.query(metaDataQuery, {});
  const firmNewsContent = await client.query(firmNewsQuery, {});
  const firmEventsContent = await client.query(firmEventsQuery, {});
  const officeLocationContent = await client.query(officeLocationsQuery, {})
  const allFirmPractices = await client.query(corePracticesQuery, {});
  const filteredNews = firmNewsContent.data.category.posts.edges.filter((_, i) => i <= 2)
  const filteredEvents = firmEventsContent.data.category.posts.edges.filter((_, i) => i <= 2)
  const filterCorePractices = allFirmPractices.data.practices.edges.filter((p) => {
    const practice = p.node.practicePortalPageContent.practicePortalCategories;
    
    if(practice !== null) {
      if(practice[0] ===  'Core Practices') {
        return practice[0]
      }
    }
  })

  return {
    props: {
      seo: metaDataContent.data.page.seo,
      posts: [...filteredEvents, ...filteredNews],
      locations: officeLocationContent.data.officeLocations.nodes,
      corePractices: filterCorePractices
    },
  };
}
