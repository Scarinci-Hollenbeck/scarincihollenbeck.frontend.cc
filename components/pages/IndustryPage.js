import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderIndustry from 'layouts/SubHeader/SubHeaderIndustry';
import { Title60 } from 'styles/common/Typography.style';
import { IndustryPageWrapper } from 'styles/Industries.style';
import empty from 'is-empty';
import { useRouter } from 'next/router';
import { getPaginationData } from 'requests/getPaginationData';
import { getClientsQuery } from 'requests/graphql-queries';

const FilledSection = dynamic(() => import('components/organisms/industries/FilledSection'));
const VerticalTabs = dynamic(() => import('components/organisms/locations/VerticalTabs'));
const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));
const IndustryAttorneys = dynamic(() => import('components/organisms/industries/IndustryAttorneys'));
const IndustryFaq = dynamic(() => import('components/organisms/industries/IndustryFaq'));
const IndustryWhyChooseUs = dynamic(() => import('components/organisms/industries/IndustryWhyChooseUs'));
const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));
const IndustryClients = dynamic(() => import('components/organisms/industries/IndustryClients'));
const IndustryPostsSlider = dynamic(() => import('components/organisms/industries/IndustryPostsSlider'));
const Awards = dynamic(() => import('components/organisms/home/Awards'));
const IndustrySpotlight = dynamic(() => import('components/organisms/industries/IndustrySpotlight'));

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
  clients: {
    id: 'clients-section',
  },
  attorneys: {
    id: 'attorneys-section',
    title: 'Attorneys',
  },
  awards: {
    id: 'awards-section',
    title: 'Awards',
  },
  faq: {
    id: 'faq-section',
    title: 'FAQs',
  },
  whyChooseUs: {
    id: 'why-choose-us-section',
    title: 'Why choose us',
  },
  articles: {
    id: 'articles-section',
    title: 'Related Articles',
  },
};

const IndustryPage = ({ content, seo, canonicalLink }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { query } = useRouter();

  const {
    title,
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
    awards,
    spotlight,
  } = content;

  const clientsPaginationData = getPaginationData(getClientsQuery, {
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
        canonicalUrl={canonicalLink}
      />
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
        <VerticalTabs
          title={anchorLinks?.verticalTabs?.title}
          contentTabs={contentTabs}
          anchorId={anchorLinks?.verticalTabs?.id}
          headerOffset={100}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <IndustryClients
          title={clients?.title}
          description={clients?.description}
          clientsPaginationData={clientsPaginationData}
          anchorId={anchorLinks?.clients?.id}
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
          <>
            <LogoSeparator direction="row" isBig isContainer />
            <Awards
              anchorId={anchorLinks?.awards?.id}
              awards={awards}
              title={`${title} Awards`}
              isLightVariant
            />
          </>
        )}

        <IndustryFaq faqList={faq} anchorId={anchorLinks?.faq?.id} />

        <IndustryWhyChooseUs
          data={whyChooseUs}
          anchorId={anchorLinks?.whyChooseUs?.id}
        />

        <SubscriptionBanner isIndustry TitleComponent={Title60} />

        <IndustryPostsSlider
          posts={relatedPosts}
          anchorId={anchorLinks?.articles?.id}
        />
      </IndustryPageWrapper>
    </>
  );
};

export default IndustryPage;
