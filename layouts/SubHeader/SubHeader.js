import { useRouter } from 'next/router';
import SpecialSubHeader from './SpecialSubHeader';
import DefaultSubHeader from './DefaultSubHeader';
import { getSlugFromUrl } from '../../utils/helpers';
import SliderSubHeader from './SliderSubHeader';
import CyberSecuritySubHeader from './CyberSecuritySubHeader';

const renderSubHeader = (pageSlug, props) => {
  const pagesMap = {
    'new-jersey-cannabis-law': <SpecialSubHeader {...props} />,
    'entertainment-and-media': <SliderSubHeader {...props} />,
    'cyber-security-data-privacy': <CyberSecuritySubHeader {...props} />,
  };

  return pagesMap[pageSlug] || <DefaultSubHeader {...props} />;
};
const SubHeader = ({
  title,
  subtitle,
  isBlog,
  isHoliday,
  handleClickAnchor,
  isFilter = false,
  authors = [],
  date = '',
  tabs,
  setActiveTab,
  activeTab,
  backgroundImage,
  anchorId,
  article,
  backgroundVideo,
  slidesData,
  sliderCfg,
  subHeaderBtns,
  backgroundGif,
  subHeaderBgLogo,
  attorneyListPractice,
}) => {
  const { pathname } = useRouter();
  const slug = getSlugFromUrl(pathname);

  const subHeaderProps = {
    title: title.replace(/Law/i, 'law'),
    subtitle,
    isBlog,
    isHoliday,
    isFilter,
    authors,
    date,
    tabs,
    setActiveTab,
    activeTab,
    backgroundImage,
    anchorId,
    article,
    backgroundVideo,
    handleClickAnchor,
    slidesData,
    sliderCfg,
    subHeaderBtns,
    backgroundGif,
    subHeaderBgLogo,
    attorneyListPractice,
  };

  return <>{renderSubHeader(slug, subHeaderProps)}</>;
};

export default SubHeader;
