import Head from 'next/head';
import NavBar from '../../../components/navbar';
import Footer from '../../../components/footer';
import Breadcrumbs from '../../../components/breadcrumbs';
import ArchiveLayout from '../../../layouts/archive-layout';
import Body from './body';
import Sidebar from './sidebar';
import { headers } from '../../../utils/helpers';


export default function Archive({ slides, seo, results, pages, currentPage, term, posts, firmNews, firmEvents, firmInsights}){

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`https://scarincihollenbeck.com/archives/${seo.canonicalLink}`} />
      </Head>
      <NavBar />
      <div id="archives">
        <ArchiveLayout
          header={(<Breadcrumbs breadCrumb={[term, 1]} categorySlug={term} />)}
          body={(
            <Body
              results={results}
              term={term}
              pages={pages}
              currentPage={currentPage}
              news={firmNews}
              events={firmEvents}
              insight={firmInsights}
            />
          )}
          sidebar={(<Sidebar trending={posts}/>)}
        />
      </div>
      <Footer slides={slides} />
    </>
  )
}

export async function getStaticPaths() {
  const archiveResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/wp/v2/categories?per_page=100`, { headers });
  const archive = await archiveResponse.json();

  return  {
    paths: archive.map(category => `/archives/${category.slug}`) || [],
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  const sliderResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/just-in/posts`, { headers });
  const slides = await sliderResponse.json();
  const postResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/archive/query/${params.slug}/1`, { headers });
  const articlesResponse = await fetch(`${process.env.REACT_APP_CACHED_API}/cached/latest-articles`, { headers });
  const postJson = await postResponse.json();
  const articleJson = await articlesResponse.json();
  const { results, pages, posts, currentPage, term } = postJson;
  const { firmNews, firmEvents, firmInsights } = articleJson;

  const seo = {
    title: `Article Archives For Term ${term} | Scarinci Hollenbeck`,
    metaDescription: `On Scarinci Hollenbeck's popular legal blog, you can find articles pertaining to ${term} and much, much more.`,
    canonicalLink: `archives/${term}`
  };
  

  return {
    props: {
      slides,
      seo,
      results,
      pages,
      currentPage,
      term,
      posts,
      firmNews,
      firmEvents,
      firmInsights
    },
  }
}