import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CURRENT_DOMAIN } from 'utils/constants';
import {
  buildPersonSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocationSchema,
  buildItemListSchema,
  buildWebPageSchema,
  buildJobPostingSchema,
  buildBusinessSchema,
  buildServiceSchema,
  STANDARD_SCHEMA,
} from 'utils/json-ld-schemas';

const PERSON_SCHEMA_ROUTES = new Set([
  '/location/[slug]',
  '/practices/[slug]',
  '/library/author/[slug]',
]);

const BasicSiteHead = ({
  title,
  metaDescription,
  canonicalUrl,
  personDataForSchema,
  breadcrumbs,
  faqData,
  locationSeo,
  itemListData,
  itemListMeta,
  webPageData,
  jobPostingData,
  officeLocationsData,
  includeOrganizationSchema,
  hqGeo,
  serviceSchemaData,
}) => {
  const router = useRouter();
  const slug = router.asPath;
  const currentUrl = CURRENT_DOMAIN + slug;
  const personSchema = personDataForSchema?.length > 0 && PERSON_SCHEMA_ROUTES.has(router.route)
    ? buildPersonSchema(personDataForSchema)
    : null;
  const breadcrumbSchema = breadcrumbs?.length > 0 ? buildBreadcrumbSchema(breadcrumbs) : null;
  const faqSchema = faqData?.length > 0 ? buildFaqSchema(faqData) : null;
  const locationSchema = locationSeo ? buildLocationSchema(locationSeo) : null;
  const itemListSchema = itemListData?.length > 0
    ? buildItemListSchema(itemListData, itemListMeta)
    : null;
  const webPageSchema = webPageData ? buildWebPageSchema(webPageData) : null;
  const jobPostingSchema = jobPostingData
    ? buildJobPostingSchema(jobPostingData)
    : null;
  const officeLocationSchemas = officeLocationsData?.length > 0
    ? officeLocationsData.map(buildLocationSchema)
    : null;
  const organizationSchema = includeOrganizationSchema
    ? buildBusinessSchema(hqGeo)
    : null;
  const serviceSchema = serviceSchemaData
    ? buildServiceSchema(
      serviceSchemaData.name,
      serviceSchemaData.description,
      serviceSchemaData.url,
    )
    : null;

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
      {organizationSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: STANDARD_SCHEMA }}
        />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={`${CURRENT_DOMAIN}/images/no-image-found-diamond.png`}
      />
      {personSchema && (
        <script
          key="ScarinciHollenbeck Bio Profile"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {locationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {webPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      )}
      {jobPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      )}
      {officeLocationSchemas?.map((schema, i) => (
        <script
          key={`office-location-${i + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
    </Head>
  );
};

export default BasicSiteHead;
