import Head from 'next/head';
import { CURRENT_DOMAIN, SITE_TITLE } from 'utils/constants';
import {
  STANDARD_SCHEMA,
  articleSchema,
  buildBreadcrumbSchema,
} from 'utils/json-ld-schemas';

const buildAuthorField = (authors) => {
  if (!authors?.length) return null;
  const mapAuthor = (a) => ({
    '@type': 'Person',
    '@id': `${CURRENT_DOMAIN}${a.uri}`,
    name: a.display_name,
    url: `${CURRENT_DOMAIN}${a.uri}`,
  });
  return authors.length === 1 ? mapAuthor(authors[0]) : authors.map(mapAuthor);
};

const PostSiteHead = ({
  seo,
  post,
  authors,
  canonicalUrl,
  breadcrumbs,
  mainCategory,
}) => {
  const { metaTitle, metaDescription, opengraphImage } = seo;

  const articleJsonLD = {
    '@id': `${canonicalUrl}#article`,
    headline: metaTitle,
    description: metaDescription,
    image: opengraphImage
      ? { '@type': 'ImageObject', url: opengraphImage }
      : undefined,
    author: buildAuthorField(authors),
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    datePublished: post.date,
    dateModified: post.modified || post.date,
    inLanguage: 'en-US',
    ...(post.tags?.length > 0 && {
      keywords: post.tags.map((t) => t.name).join(', '),
    }),
    ...(mainCategory?.name && { articleSection: mainCategory.name }),
  };

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={opengraphImage} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_TITLE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: STANDARD_SCHEMA }}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={opengraphImage} />
      <script
        key="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(articleJsonLD)),
        }}
      />
      {breadcrumbs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
          }}
        />
      )}
    </Head>
  );
};

export default PostSiteHead;
