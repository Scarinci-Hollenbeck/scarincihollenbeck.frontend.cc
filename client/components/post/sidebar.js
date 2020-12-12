import Link from 'next/link';
import Search from 'components/search';
import TrendingStories from 'components/trending-stories';
import SubscriptionMessage from 'components/subscription-message';
import { addRandomKey } from 'utils/helpers';

export default function PostSidebar({ posts, attorneys }) {
  return (
    <div className="d-print-none">
      <Search />
      {/** TOP ARTICLES */}
      <TrendingStories title="Trending Stories" content={posts} />
      {/** MENTIONED ATTORNEYS */}
      {attorneys.length > 0 && (
        <div className="w-100 mt-4">
          <div className="sidebar-title">Mentioned Attorneys</div>
          <div className="off-white">
            <ul className="no-dots">
              {attorneys.map((a) => (
                <li key={addRandomKey(a.name)} className="py-2 li-fchild-mt-1">
                  <Link href="/attorney[slug]" as={a.link}>
                    <a className="m-attorneys d-flex flex-row">
                      <img src={a.image} alt={a.name} className="mr-2" />
                      <span className="ml-2 related-attorneys">
                        <h5 className="proxima-bold mb-0">{a.name}</h5>
                        <p className="proxima-regular mt---6">
                          {a.designation}
                        </p>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/** GET THE LATEST FROM OUR ATTORNEYS */}
      <SubscriptionMessage />
    </div>
  );
}
