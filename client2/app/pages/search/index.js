import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import Breadcrumbs from '../../components/breadcrumbs';
import ArchiveLayout from '../../layouts/archive-layout';
import Body from './body';
import Sidebar from './sidebar';
import { headers, urlify } from '../../utils/helpers';
const request = require('superagent');

function Archive({ slides, firmNews, firmEvents, firmInsights}){
  const router = useRouter()
  const { q, page } = router.query
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // fetch query results
      const fetchQuery = request.get(`http://localhost:8400/wp-json/search/query/${q}/${page}`)
        .set(headers)
        .then((res) => ({
          status: res.status,
          body: JSON.parse(res.text),
        }))
        .catch((err) => err);

      fetchQuery.then((results) => {
        const { status, body } = results;

        if (status === 200) {
          const { results, pages, term, posts } = body;
           
          setResults(results);
          setPages(pages);
          setTerm(term);    
          setCurrentPage(page);
          setPosts(posts);
        }
      });
    };
    
    if(q !== undefined && page !== undefined) {
      fetchData();
    }
    
  }, [q, page]);

  return (
    <>      
      <NavBar />
      <div id="search">
        <ArchiveLayout
          header={(<Breadcrumbs breadCrumb={[term, currentPage]} categorySlug={term} />)}
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


export async function getStaticProps() {
  const sliderResponse = await fetch(`${process.env.REACT_APP_WP_BACKEND}/wp-json/just-in/posts`, { headers });
  const slides = await sliderResponse.json();  
  const articlesResponse = await fetch(`${process.env.REACT_APP_CACHED_API}/cached/latest-articles`, { headers });
  const articleJson = await articlesResponse.json();
  const { firmNews, firmEvents, firmInsights } = articleJson;
  

  return {
    props: {
      slides,
      firmNews,
      firmEvents,
      firmInsights
    },
  }
}

export default Archive
