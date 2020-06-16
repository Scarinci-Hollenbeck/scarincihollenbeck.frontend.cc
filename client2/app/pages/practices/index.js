import Head from 'next/head';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import SimpleList from './practice-simple-list';
import PracticeBlockList from './practice-block-list';
import SingleSubHeader from '../../layouts/single-sub-header';
import FullWidth from '../../layouts/full-width';
import { headers, sortByKey } from '../../utils/helpers';
import { singleCityBackgroundJPG } from '../../utils/next-gen-images';

function sortPracticeCategorys(list) {
  const core = list.filter((e) => e.category === 'Core Practices');
  const additional = list.filter((e) => e.category === 'Additional Practices');
  const business = list.filter((e) => e.category === 'Business Related Practices');

  return {
    core,
    additional,
    business,
  };
};

export default function Administration({ slides, core, additional, business, seo }){

  const sortedCore = sortByKey(core, 'title');
  const sortedAdditional = sortByKey(additional, 'title');
  const sortedBusiness = sortByKey(business, 'title');

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`http://scarincihollenbeck.com/${seo.canonicalLink}`} />
      </Head>
      <NavBar />
      <SingleSubHeader
          title="Legal Practices"
          subtitle="Scarinci Hollenbeck attorneys at law provide a fully scaled platform of law practices for today&apos;s businesses. Recognizing the complexity of the law practices, we have staffed each practice group with lawyers experienced in the particular area of your need."         
          image={singleCityBackgroundJPG}
        />
      <div id="archive-practice">
        <FullWidth>
          <div id="archive-practice">
            <p className="text-muted lead text-center w-100">
              As you scroll through the law practices and locate the sub-practice groups that most closely identifies with your need, feel free to contact any of the attorneys identified within the sub-practice group. Feel free to contact any of the Section Chiefs identified under each of the named law practices. They will be happy to assist you and guide you to the appropriate attorney for resolution of your issue.
            </p>
            <div className="mt-4 px-0">
              <div className="line-header">
                <h3>CORE PRACTICES</h3>
              </div>
            </div>
            <PracticeBlockList list={sortedCore} />
            <div className="mt-4 px-0">
              <div className="line-header">
                <h3>ADDITIONAL PRACTICES</h3>
              </div>
            </div>
            <PracticeBlockList list={sortedAdditional} id={28270} />
            <div className="mt-4 px-0">
              <div className="line-header">
                <h3>BUSINESS RELATED LEGAL SERVICES</h3>
              </div>
            </div>
            <SimpleList list={sortedBusiness} />          
          </div>        
        </FullWidth>
      </div>
      <Footer slides={slides} />
    </>
  )
}

export async function getStaticProps() {
  const sliderResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/just-in/posts`, { headers });
  const practiceResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/practice-portal/page/`, { headers });
  const practiceJson = await practiceResponse.json();
  const results = await sortPracticeCategorys(practiceJson.practices);
  const slides = await sliderResponse.json();
  const { core, additional, business } = results;

  return {
    props: {
      slides,
      core,
      additional,
      business,
      seo: practiceJson.seo,
    },
  }
}