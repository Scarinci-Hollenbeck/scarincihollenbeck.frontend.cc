import Head from 'next/head';
import { CURRENT_DOMAIN } from 'utils/constants';
import { STANDARD_SCHEMA, articleSchema } from 'utils/json-ld-schemas';

const PostSiteHead = ({
  seo, post, authors, canonicalUrl,
}) => {
  const { metaTitle, metaDescription, opengraphImage } = seo;

  const articleJsonLD = {
    headline: metaTitle,
    alternativeHeadline: metaDescription,
    image: opengraphImage,
    author: {
      '@type': 'Person',
      url: authors.map((a) => a.uri).join(', '),
      name: authors.map((a) => a.display_name).join(', '),
    },
    url: canonicalUrl,
    datePublished: post.date,
    dateCreated: post.date,
    dateModified: post.date,
    description: post.subTitle,
    articleBody: post.content,
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={opengraphImage} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={metaTitle} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: STANDARD_SCHEMA }}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={opengraphImage} />
        <script
          key="ScarinciHollenbeck Bio Profile"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema(articleJsonLD)),
          }}
        />
      </Head>
    </>
  );
};

export default PostSiteHead;
