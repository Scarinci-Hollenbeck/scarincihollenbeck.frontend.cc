import useIsScroll from 'hooks/useIsScroll';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import { PracticesContext } from 'contexts/PracticesContext';
import SpecialHeader from './SpecialHeader';
import {
  createMenuData,
  createOverviewLinks,
  getSlugFromUrl,
} from '../../../utils/helpers';
import { LocationContext } from '../../../contexts/LocationContext';
import DefaultHeader from './DefaultHeader';

const sanitizePractices = (data) => {
  if (!data) return [];

  return data?.map((item) => ({
    databaseId: item?.databaseId,
    uri: item?.uri,
    title: item?.title,
    list: item?.childPractice || [],
  }));
};

const renderHeader = (pageSlug, props) => {
  const pagesMap = {
    // 'new-jersey-cannabis-law': <SpecialHeader {...props} />,
    // 'entertainment-and-media': <SpecialHeader {...props} />, // page ready for deploy in prod but paused, commit 26.12.2023
  };

  return pagesMap[pageSlug] || <DefaultHeader {...props} />;
};
export default function Header() {
  const { pathname } = useRouter();
  const slug = getSlugFromUrl(pathname);
  const { practices } = useContext(PracticesContext);
  const { locations } = useContext(LocationContext);

  const practiceWithOverview = useMemo(
    () => createOverviewLinks(practices, false),
    [practices],
  );

  const sanitizedPractices = sanitizePractices(practiceWithOverview);

  const menuData = createMenuData(sanitizedPractices, locations);

  const headerProps = {
    pathname,
    practices: sanitizedPractices,
    locations,
    menuData,
  };

  return <>{renderHeader(slug, headerProps)}</>;
}
