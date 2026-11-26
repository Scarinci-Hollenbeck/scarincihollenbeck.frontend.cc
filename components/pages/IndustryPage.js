import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import PageSchemaMarkup from 'components/shared/head/PageSchemaMarkup';
import SubHeaderIndustry from 'layouts/SubHeader/SubHeaderIndustry';
import { Title60 } from 'styles/common/Typography.style';
import { IndustryPageWrapper } from 'styles/Industries.style';
import empty from 'is-empty';
import { useRouter } from 'next/router';
import { usePaginationData } from 'hooks/usePaginationData';
import { getClientsQuery } from 'requests/graphql-queries';

const FilledSection = dynamic(() => import('components/organisms/industries/FilledSection'));
const IndustryAreas = dynamic(() => import('components/organisms/industries/IndustryAreas'));
const IndustryContact = dynamic(() => import('components/organisms/industries/IndustryContact'));
const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));
const IndustryAttorneys = dynamic(() => import('components/organisms/industries/IndustryAttorneys'));
const IndustryFaq = dynamic(() => import('components/organisms/industries/IndustryFaq'));
const IndustryWhyChooseUs = dynamic(() => import('components/organisms/industries/IndustryWhyChooseUs'));
const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));
const IndustryClients = dynamic(() => import('components/organisms/industries/IndustryClients'));
const IndustryPostsSlider = dynamic(() => import('components/organisms/industries/IndustryPostsSlider'));
const Awards = dynamic(() => import('components/organisms/home/Awards'));
const IndustrySpotlight = dynamic(() => import('components/organisms/industries/IndustrySpotlight'));

// Key order is the order of the sections on the page and of the jump links
// at the top of it.
const anchorDataDefault = {
  filledSection: {
    id: 'filled-section',
  },
  spotlight: {
    id: 'spotlight-section',
  },
  verticalTabs: {
    id: 'tabs-section',
    title: 'Areas of Service',
  },
  articles: {
    id: 'articles-section',
    title: 'Related Articles',
  },
  attorneys: {
    id: 'attorneys-section',
    title: 'Attorneys',
  },
  awards: {
    id: 'awards-section',
    title: 'Awards',
  },
  clients: {
    id: 'clients-section',
  },
  faq: {
    id: 'faq-section',
    title: 'FAQs',
  },
  whyChooseUs: {
    id: 'why-choose-us-section',
    title: 'Why choose us',
  },
};

const IndustryPage = ({
  content,
  seo,
  canonicalLink,
  breadcrumbs,
  webPageData,
  pageSchemaJsonLd,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { query } = useRouter();

  const {
    title,
    databaseId,
    description,
    featuredImage,
    contentSection,
    contentTabs,
    slides,
    faq,
    whyChooseUs,
    chairIndustry,
    attorneyListIndustry,
    clients,
    relatedPosts,
    articlesTagId,
    awards,
    spotlight,
  } = content;

  const clientsPaginationData = usePaginationData(getClientsQuery, {
    currentPage: query?.['client-page'] || 1,
    itemsPerPage: 12,
    id: [clients?.clientsConnection?.[0]?.databaseId],
  });

  const concatenatedAttorneys = [...chairIndustry, ...attorneyListIndustry];

  const anchorLinks = useMemo(() => {
    const copyAnchorData = { ...anchorDataDefault };

    const conditions = {
      filledSection: {
        check: empty(contentSection?.description),
        onFalse: () => (copyAnchorData.filledSection.title = contentSection?.title),
      },
      verticalTabs: { check: empty(contentTabs) },
      attorneys: { check: empty(concatenatedAttorneys) },
      awards: { check: empty(awards) },
      spotlight: {
        check: empty(spotlight?.title) && empty(spotlight?.description),
        onFalse: () => (copyAnchorData.spotlight.title = spotlight?.title || 'Spotlight'),
      },
      articles: { check: empty(relatedPosts) },
      clients: {
        check: empty(clientsPaginationData?.clients?.edges),
        onFalse: () => (copyAnchorData.clients.title = clients?.title || 'Attorneys in Actions'),
      },
    };

    Object.entries(conditions).forEach(([key, { check, onFalse }]) => {
      if (check) {
        delete copyAnchorData[key];
      } else if (onFalse) {
        onFalse();
      }
    });

    return copyAnchorData;
  }, [
    contentSection,
    contentTabs,
    concatenatedAttorneys,
    relatedPosts,
    clientsPaginationData,
    anchorDataDefault,
    awards,
    spotlight,
  ]);

  return (
    <>
      <BasicSiteHead
        title={seo?.title}
        metaDescription={seo?.metaDesc}
        ogImage={seo?.opengraphImage?.sourceUrl}
        canonicalUrl={canonicalLink}
        breadcrumbs={breadcrumbs}
        faqData={faq}
        webPageData={webPageData}
        serviceSchemaData={{
          name: title,
          description: seo?.metaDesc,
          url: canonicalLink,
        }}
      />
      <PageSchemaMarkup schemaJson={pageSchemaJsonLd} />
      <SubHeaderIndustry
        title={title}
        description={description}
        attorneys={concatenatedAttorneys?.slice(0, 6)}
        slides={slides}
        backgroundImage={featuredImage}
        anchors={Object.values(anchorLinks)}
        attorneysAnchorId={anchorLinks?.attorneys?.id}
        setActiveTab={setActiveTab}
      />
      <IndustryPageWrapper>
        <FilledSection
          title={contentSection?.title}
          content={contentSection?.description}
          anchorId={anchorLinks?.filledSection?.id}
        />
        <IndustrySpotlight
          spotlight={spotlight}
          anchorId={anchorLinks?.spotlight?.id}
        />
        <IndustryAreas
          title={anchorLinks?.verticalTabs?.title}
          areas={contentTabs}
          anchorId={anchorLinks?.verticalTabs?.id}
          activeArea={activeTab}
          setActiveArea={setActiveTab}
        />

        <IndustryPostsSlider
          posts={relatedPosts}
          industryId={databaseId}
          articlesTagId={articlesTagId}
          anchorId={anchorLinks?.articles?.id}
        />

        {!empty(concatenatedAttorneys) && (
          <>
            <LogoSeparator direction="row" isBig isContainer />

            <IndustryAttorneys
              title={anchorLinks?.attorneys?.title}
              attorneys={concatenatedAttorneys}
              anchorId={anchorLinks?.attorneys?.id}
            />
          </>
        )}

        {!empty(awards) && (
          <Awards
            anchorId={anchorLinks?.awards?.id}
            awards={awards}
            title={`${title} Awards`}
            isLightVariant
          />
        )}

        <IndustryClients
          title={clients?.title}
          description={clients?.description}
          clientsPaginationData={clientsPaginationData}
          anchorId={anchorLinks?.clients?.id}
        />

        <>
          <LogoSeparator direction="row" isBig isContainer />
          <IndustryFaq faqList={faq} anchorId={anchorLinks?.faq?.id} />
        </>

        <IndustryWhyChooseUs
          data={whyChooseUs}
          anchorId={anchorLinks?.whyChooseUs?.id}
        />

        <SubscriptionBanner
          isIndustry
          TitleComponent={Title60}
          aside={<IndustryContact />}
        />
      </IndustryPageWrapper>
    </>
  );
};

export default IndustryPage;
