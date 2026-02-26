import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import { MainAttorneysContainer } from 'styles/Attornyes.style';
import { useEffect, useRef } from 'react';
import AttorneyFilters from 'components/organisms/attorneys/AttorneyFilters';
import { useDispatch, useSelector } from 'react-redux';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import {
  ScarinciHollenbeckKeyContact,
  DEFAULT_SCHEMA_FAQ,
} from 'utils/constants';
import dynamic from 'next/dynamic';
import { FaqContainer } from 'styles/Faq.style';
import SubHeaderKeyContacts from 'layouts/SubHeader/SubHeaderKeyContacts';
import { setReferenceId } from '../../redux/slices/attorneys.slice';
import { useGetLocationsQuery } from '../../redux/services/project-api';

const FAQ = dynamic(() => import('components/atoms/FAQ'));
const WhatWeDoSection = dynamic(() => import('components/organisms/home/WhatWeDoSection'));
const WhyChooseUs = dynamic(() => import('components/organisms/practices/WhyChooseUs'));

const AttorneysPage = ({
  seo,
  site,
  canonicalUrl,
  attorneyArchives,
  seoAttorneys,
  practices,
  breadcrumbs,
  webPageData,
  itemListData,
  itemListMeta,
}) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const { data: locations } = useGetLocationsQuery();
  const { headerSize } = useSelector((state) => state.sizes);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      dispatch(setReferenceId(containerRef.current.id));
    }
  }, [containerRef.current]);

  return (
    <>
      <BasicSiteHead
        title={seo.title}
        metaDescription={seo.metaDesc}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
        webPageData={webPageData}
        faqData={DEFAULT_SCHEMA_FAQ}
        itemListData={itemListData}
        itemListMeta={itemListMeta}
      />
      <SubHeaderDefault
        title={site.title}
        subtitle={site.description}
        RightContentComponent={SubHeaderKeyContacts}
        rightContentProps={{ keyContacts: [ScarinciHollenbeckKeyContact] }}
      />
      <MainAttorneysContainer
        $headerHeight={`${headerSize?.height + 8}px`}
        ref={containerRef}
        id="attorneys-container"
      >
        <AttorneyFilters
          practices={practices}
          locations={locations?.data}
          attorneyArchives={attorneyArchives}
          seoAttorneys={seoAttorneys}
        />

        <FaqContainer>
          <FAQ isTwoColumns isSingleOpened />
        </FaqContainer>

        <WhatWeDoSection practices={practices} />
        <WhyChooseUs />
      </MainAttorneysContainer>
    </>
  );
};

export default AttorneysPage;
