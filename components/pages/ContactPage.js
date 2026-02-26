import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import React from 'react';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import dynamic from 'next/dynamic';
import ContactBlock from 'components/organisms/contact-us/ContactBlock';
import SubHeaderLocations from 'layouts/SubHeader/SubHeaderLocations';

const AllOfficeLocations = dynamic(() => import('components/organisms/home/AllOfficeLocations'));

const ContactPage = ({
  seo,
  title,
  description,
  officeLocations,
  mapLocations,
  featuredImage,
  canonicalUrl,
  breadcrumbs,
  webPageData,
  officeLocationsData,
  hqGeo,
}) => (
  <>
    <BasicSiteHead
      title={seo.title}
      metaDescription={seo.metaDesc}
      canonicalUrl={canonicalUrl}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
      officeLocationsData={officeLocationsData}
      includeOrganizationSchema
      hqGeo={hqGeo}
    />
    <SubHeaderDefault
      title={title}
      subtitle={description}
      backgroundImage={featuredImage}
      RightContentComponent={SubHeaderLocations}
      rightContentProps={{
        locations: officeLocations,
        title,
        isLocationTabs: true,
      }}
    />
    <ContactBlock />
    <AllOfficeLocations offices={mapLocations} />
  </>
);

export default ContactPage;
