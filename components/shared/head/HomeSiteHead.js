import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CURRENT_DOMAIN } from 'utils/constants';
import { buildBusinessSchema, buildWebPageSchema } from 'utils/json-ld-schemas';

const HomeSiteHead = ({
  title,
  metaDescription,
  canonicalUrl,
  webPageData,
  hqGeo,
}) => {
  const router = useRouter();
  const slug = router.asPath;
  const currentUrl = CURRENT_DOMAIN + slug;
  const webPageSchema = webPageData ? buildWebPageSchema(webPageData) : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={currentUrl} />
      <meta
        property="og:image"
        content={`${CURRENT_DOMAIN}/images/no-image-found-diamond.png`}
      />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <script
        key="ScarinciHollenbeck"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBusinessSchema(hqGeo)),
        }}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={`${CURRENT_DOMAIN}/images/no-image-found-diamond.png`}
      />
      {webPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      )}
      <meta
        name="google-site-verification"
        content="Vb4fICdLxnhQzqJEDL11a-Tk0X5f4XhW35pA0qoeh1E"
      />
    </Head>
  );
};

export default HomeSiteHead;
