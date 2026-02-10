import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ErrorPage from 'components/pages/ErrorPage';
import { ERROR_PAGE_CONTENT } from 'utils/constants';

/**
 * Map of path prefixes to their redirect destinations.
 * When a 404 occurs on a page matching one of these prefixes,
 * the user is redirected to the corresponding destination with a notification.
 *
 * This avoids server-side redirects in getStaticProps which Vercel caches permanently.
 */
const NOT_FOUND_REDIRECTS = [
  { prefix: '/attorneys/', destination: '/attorneys?notFound=true' },
  { prefix: '/practices/', destination: '/services?notFound=true' },
  { prefix: '/library/category/', destination: '/library?notFound=true' },
];

const Custom404 = () => {
  const router = useRouter();
  const title = 'Oops!';
  const subTitle = 'Page not found.';
  const { mainMessage } = ERROR_PAGE_CONTENT;

  useEffect(() => {
    const match = NOT_FOUND_REDIRECTS.find(({ prefix }) => router.asPath.startsWith(prefix));

    if (match) {
      router.replace(match.destination);
    }
  }, [router]);

  return (
    <ErrorPage title={title} subTitle={subTitle} mainMessage={mainMessage} />
  );
};

export default Custom404;
