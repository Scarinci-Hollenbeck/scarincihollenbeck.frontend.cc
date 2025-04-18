import { useRouter } from 'next/router';
import { useMemo } from 'react';
import empty from 'is-empty';
import { FIRM_PAGES, LIBRARY_NAV } from 'utils/constants';
import dynamic from 'next/dynamic';
import {
  useGetIndustriesQuery,
  useGetLocationsQuery,
  useGetPracticesQuery,
} from '../../../redux/services/project-api';
import DefaultHeader from './DefaultHeader';
import { createOverviewLinks } from '../../../utils/helpers';

const HomeIcon = dynamic(() => import('components/common/icons/HomeIcon'));
const AttorneysIcon = dynamic(() => import('components/common/icons/AttorneysIcon'));
const PracticesIcon = dynamic(() => import('components/common/icons/PracticesIcon'));
const IndustriesIcon = dynamic(() => import('components/common/icons/IndustriesIcon'));
const LocationsIcon = dynamic(() => import('components/common/icons/LocationsIcon'));
const LibraryIcon = dynamic(() => import('components/common/icons/LibraryIcon'));
const FirmIcon = dynamic(() => import('components/common/icons/FirmIcon'));
const CareersIcon = dynamic(() => import('components/common/icons/CareersIcon'));

export const createMenuData = (practices, locations, industries) => [
  {
    databaseId: 'menu-01',
    title: 'Homepage',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    databaseId: 'menu-02',
    title: 'Attorneys',
    icon: <AttorneysIcon />,
    href: '/attorneys',
  },
  {
    databaseId: 'menu-03',
    title: 'Legal Practices',
    icon: <PracticesIcon />,
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-practices',
        uri: '/services',
        title: 'View all practices',
        additionalClass: 'bolder',
      },
      ...practices,
    ],
  },
  {
    databaseId: 'menu-04',
    title: 'Industries',
    icon: <IndustriesIcon />,
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-industries',
        uri: '/services#industries',
        title: 'View all industries',
        additionalClass: 'bolder',
      },
      ...industries,
    ],
  },
  {
    databaseId: 'menu-05',
    title: 'Locations',
    icon: <LocationsIcon />,
    href: '/location/new-york',
    list: !empty(locations) ? [...locations] : [],
  },
  {
    databaseId: 'menu-06',
    title: 'Library',
    icon: <LibraryIcon />,
    href: '/',
    list: LIBRARY_NAV,
  },
  {
    databaseId: 'menu-07',
    title: 'The Firm',
    icon: <FirmIcon />,
    href: '/',
    list: FIRM_PAGES,
  },
  {
    databaseId: 'menu-08',
    title: 'Careers',
    icon: <CareersIcon />,
    href: '/careers',
  },
];

const sanitizePractices = (data) => {
  if (!data) return [];

  return data?.map((item) => ({
    databaseId: item?.databaseId,
    uri: item?.uri,
    title: item?.title,
    list: item?.childPractice || [],
  }));
};

const sanitizeIndustries = (data) => {
  if (!data) return [];

  return data?.map((item) => ({
    databaseId: item?.databaseId,
    uri: item?.uri,
    title: item?.title,
  }));
};

export default function Header() {
  const { pathname } = useRouter();
  const { data: locations } = useGetLocationsQuery();
  const { data: practices } = useGetPracticesQuery();
  const { data: industries } = useGetIndustriesQuery();

  const sanitizedPractices = useMemo(() => {
    const practiceWithOverview = createOverviewLinks(practices?.data, false);
    return sanitizePractices(practiceWithOverview);
  }, [practices]);

  const menuData = useMemo(
    () => createMenuData(
      sanitizedPractices,
      locations?.data,
      sanitizeIndustries(industries?.data),
    ),
    [sanitizedPractices, locations, industries],
  );

  const headerProps = {
    pathname,
    practices: sanitizedPractices,
    locations: locations?.data,
    menuData,
    industries: industries?.data,
  };

  return <DefaultHeader {...headerProps} />;
}
