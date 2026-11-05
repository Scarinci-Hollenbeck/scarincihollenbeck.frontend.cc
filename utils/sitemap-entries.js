const { finalPath } = require('./redirect-match');

// Google wants only final URLs in a sitemap. WordPress still lists some pages
// our redirects send elsewhere (/contact -> /contact-us), so each entry gets
// the path it ends up at; an entry is dropped when that path is already listed,
// is the home page (always listed first) or carries a #fragment.
function finalSitemapEntries(entries) {
  const listed = new Set(
    entries
      .filter(({ slug }) => finalPath(slug) === slug)
      .map(({ slug }) => slug),
  );
  const seen = new Set();
  return entries.flatMap((entry) => {
    const slug = finalPath(entry.slug);
    if (
      slug !== entry.slug
      && (listed.has(slug) || slug === '/' || slug.includes('#'))
    ) {
      return [];
    }
    if (seen.has(slug)) return [];
    seen.add(slug);
    return [slug === entry.slug ? entry : { ...entry, slug }];
  });
}

module.exports = { finalSitemapEntries };
