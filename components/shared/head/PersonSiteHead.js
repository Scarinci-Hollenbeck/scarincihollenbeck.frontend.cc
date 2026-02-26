import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CURRENT_DOMAIN } from 'utils/constants';
import {
  STANDARD_SCHEMA,
  buildAttorneyProfileSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from 'utils/json-ld-schemas';

const PersonSiteHead = ({
  title,
  metaDescription,
  canonicalUrl,
  name,
  featuredImage,
  designation,
  socialMediaLinks,
  breadcrumbs,
  email,
  telephone,
  knowsAbout,
  alumniOf,
  barAdmissions,
  affiliations,
  awards,
}) => {
  const router = useRouter();
  const slug = router.asPath;
  const currentUrl = CURRENT_DOMAIN + slug;
  const pageUrl = canonicalUrl || currentUrl;
  const standardImage = `${CURRENT_DOMAIN}/images/no-image-found-diamond.png`;

  const profilePageSchema = buildWebPageSchema({
    id: `${pageUrl}#profilepage`,
    url: pageUrl,
    name: title,
    description: metaDescription,
    pageType: 'ProfilePage',
    mainEntity: { '@id': pageUrl },
  });
  const standardSocial = [
    { url: 'https://twitter.com/S_H_Law' },
    { url: 'https://www.facebook.com/ScarinciHollenbeck/' },
    { url: 'https://www.linkedin.com/company/scarinci-hollenbeck-llc/' },
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={featuredImage || standardImage} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: STANDARD_SCHEMA }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        key="ScarinciHollenbeck Bio Profile"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildAttorneyProfileSchema({
              name,
              url: pageUrl,
              imageUrl: featuredImage || standardImage,
              socialMediaLinks: socialMediaLinks || standardSocial,
              jobTitle: designation,
              description: metaDescription,
              email,
              telephone,
              knowsAbout,
              alumniOf,
              barAdmissions,
              affiliations,
              awards,
            }),
          ),
        }}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={featuredImage || standardImage} />
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

export default PersonSiteHead;
