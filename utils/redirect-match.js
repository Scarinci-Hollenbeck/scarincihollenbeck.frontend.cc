// Which of our permanent redirects a path hits, the way Next applies them:
// the first rule whose source matches wins, matching is case-insensitive, and
// `/:slug*` also matches the bare prefix. Shared by the sitemap (it lists
// final URLs only) and scripts/smoke-compare.js (it checks the live answers).
const { PERMANENT_REDIRECTS } = require('./permanent-redirects');

const sourceRegex = (source) => new RegExp(
  `^${source
    .split(/(\/:\w+\*|:\w+)/)
    .map((part) => {
      if (/^\/:\w+\*$/.test(part)) return '(?:/(.*))?';
      if (/^:\w+$/.test(part)) return '([^/]+)';
      return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('')}$`,
  'i',
);

const RULES = PERMANENT_REDIRECTS.map((rule) => ({
  rule,
  regex: sourceRegex(rule.source),
}));

// The rule Next applies to `path` (no trailing slash: Next first answers a
// separate 308 to the path without it) and where it sends it, or null.
function appliedRedirect(path) {
  const hit = RULES.find(({ regex }) => regex.test(path));
  if (!hit) return null;
  const values = path.match(hit.regex).slice(1);
  const names = hit.rule.source.match(/:\w+\*?/g) || [];
  const byName = Object.fromEntries(names.map((name, i) => [name, values[i]]));
  return {
    rule: hit.rule,
    // An empty `/:slug*` drops its slash too: /attorneys/:slug* -> /attorneys.
    destination: hit.rule.destination.replace(
      /(\/?)(:\w+\*?)/g,
      (_, slash, name) => (byName[name] ? `${slash}${byName[name]}` : ''),
    ),
  };
}

// Where `path` ends up after following our redirects (it may be `path`
// itself). With `trailingSlash: false` Next drops a trailing slash first.
// Stops after a few hops so a redirect loop cannot hang the caller.
function finalPath(path) {
  let current = path.length > 1 ? path.replace(/\/+$/, '') : path;
  for (let hop = 0; hop < 10; hop += 1) {
    const applied = appliedRedirect(current);
    if (!applied) return current;
    current = applied.destination;
  }
  return current;
}

module.exports = { appliedRedirect, finalPath };
