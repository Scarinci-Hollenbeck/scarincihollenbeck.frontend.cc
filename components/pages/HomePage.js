import dynamic from 'next/dynamic';
import HomeBanner from 'components/organisms/home/HomeBanner';
import HomeSiteHead from 'components/shared/head/HomeSiteHead';
import { CURRENT_DOMAIN } from 'utils/constants';
import HappyHoliday from 'components/molecules/home/HappyHoliday';
import { filterAttorneysByDesignation } from 'utils/helpers';
import { useMemo } from 'react';
import HomeContactForm from 'components/organisms/home/HomeContactForm';
import RandomBioCard from 'components/molecules/common/RandomBioCard';
import { useGetAttorneysQuery } from '../../redux/services/project-api';
// import InfoModal from '../atoms/InfoModal';

// !! Attention the modal window was turned off. 12/31/2022
const AllOfficeLocations = dynamic(
  () => import('components/organisms/home/AllOfficeLocations'),
  { ssr: true },
);
const AboutFirmSection = dynamic(
  () => import('components/organisms/home/AboutFirm'),
  { ssr: true },
);
const IndustriesSection = dynamic(() => import('components/organisms/home/IndustriesSection'));
const RandomCardsSlider = dynamic(() => import('components/organisms/common/RandomCardsSlider'));
const WhatWeDoSection = dynamic(() => import('components/organisms/home/WhatWeDoSection'));
const LatestPostsSection = dynamic(() => import('components/organisms/home/LatestPostsSection'));
const Awards = dynamic(() => import('components/organisms/home/Awards'));
const WhyChooseUs = dynamic(() => import('components/organisms/home/WhyChooseUs'));

const HomePage = ({
  seo,
  awards,
  offices,
  isHoliday,
  firstSection,
  whoWeAre,
  industryWeWorkWith,
  latestArticlesTabsData,
  whyChooseUs,
  practices,
}) => {
  const { data: attorneysData } = useGetAttorneysQuery();

  const filteredAttorneysByDesignation = useMemo(
    () => filterAttorneysByDesignation(attorneysData?.data),
    [attorneysData?.data],
  );

  return (
    <>
      <HomeSiteHead
        title={seo?.title || ''}
        metaDescription={seo?.metaDesc || ''}
        canonicalUrl={CURRENT_DOMAIN}
      />
      <HomeBanner {...firstSection} />
      {isHoliday && <HappyHoliday />}
      {/* <InfoModal /> */}
      <AboutFirmSection {...whoWeAre} />
      <HomeContactForm />
      <IndustriesSection {...industryWeWorkWith} />
      <RandomCardsSlider
        list={filteredAttorneysByDesignation}
        navigationLabel="next attorney"
        title="We can help!"
        subtitle="OUR APPROACH IS AS UNIQUE AS YOUR SITUATION"
        CardComponent={RandomBioCard}
      />
      <WhatWeDoSection practices={practices} />
      <WhyChooseUs content={whyChooseUs} />
      <LatestPostsSection tabsData={latestArticlesTabsData} />
      <Awards awards={awards} />
      <AllOfficeLocations offices={offices} />
    </>
  );
};

export default HomePage;
