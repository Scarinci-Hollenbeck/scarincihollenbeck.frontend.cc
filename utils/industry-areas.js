/**
 * Areas of Service on industry pages: area headings in a grid, one panel
 * below them. Every panel is rendered on the server; inactive ones are hidden
 * with CSS only, so crawlers that skip JavaScript still read every area.
 */

// A paragraph that starts with "Related practices:", as editors write it at
// the end of an area's text in WordPress.
const RELATED_PARAGRAPH = /<p\b[^>]*>\s*(?:<(?:strong|b)>)?\s*Related practices\s*:?\s*(?:<\/(?:strong|b)>)?\s*:?\s*([\s\S]*?)<\/p>/i;
const LINK = /<a\b[^>]*>[\s\S]*?<\/a>/gi;

/**
 * Splits an area's HTML into the text and its "Related practices" items.
 * `practices` holds one HTML string per item: each link, or the whole line
 * when the editor wrote the names without links. Without such a paragraph,
 * `practices` is empty and `html` is the input unchanged.
 */
export const splitRelatedPractices = (html) => {
  const source = typeof html === 'string' ? html : '';
  const match = source.match(RELATED_PARAGRAPH);
  if (!match) return { html: source, practices: [] };

  const line = match[1].trim();
  const links = line.match(LINK) || [];
  const practices = links.length > 0 ? links : [line].filter(Boolean);

  return {
    html: (
      source.slice(0, match.index) + source.slice(match.index + match[0].length)
    ).trim(),
    practices,
  };
};

/** The area after `index`; after the last one comes the first. */
export const nextAreaIndex = (index, count) => (count > 0 ? (index + 1) % count : 0);

/**
 * Which area a key press on a heading moves to, following the WAI-ARIA tabs
 * pattern. `null` means the key is not ours.
 */
export const areaIndexForKey = (key, index, count) => {
  if (count <= 0) return null;
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (index + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (index - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
};

/** "01", "02", ... as the headings and the panel counter show them. */
export const areaNumber = (index) => String(index + 1).padStart(2, '0');
