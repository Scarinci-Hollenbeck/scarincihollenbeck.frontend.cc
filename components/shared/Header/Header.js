import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useGetIndustriesQuery,
  useGetLocationsQuery,
  useGetPracticesQuery,
} from '../../../redux/services/project-api';
import DefaultHeader from './DefaultHeader';
import { createOverviewLinks } from '../../../utils/helpers';

const sanitizePractices = (data) => {
  if (!data) return [];

  return data?.map((item) => ({
    databaseId: item?.databaseId,
    uri: item?.uri,
    title: item?.title,
    list: item?.childPractice || [],
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

  const headerProps = {
    pathname,
    practices: sanitizedPractices,
    locations: locations?.data,
    industries: industries?.data,
  };

  return <DefaultHeader {...headerProps} />;
}
