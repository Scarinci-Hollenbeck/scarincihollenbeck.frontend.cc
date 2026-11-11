import { decodeTitle } from './helpers';

// react-instantsearch 7 hands hits over with HTML-escaped highlight values
// and <mark> tags, and its Highlight unescapes them (the same five entities
// as below). decodeTitle has to see the raw title, as changeTitle did in v6.
// The hit is shown as text, so ordinals get no <span> markup (tasks #8).
const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};
const CHARACTERS = Object.fromEntries(
  Object.entries(ENTITIES).map(([entity, character]) => [character, entity]),
);
const unescapeHtml = (value) => value.replace(/&(amp|lt|gt|quot|#39);/g, (e) => ENTITIES[e]);
const escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => CHARACTERS[c]);

export const changeHighlightedTitle = (value) => escapeHtml(decodeTitle(unescapeHtml(value))).replace(
  /&lt;(\/?)mark&gt;/g,
  '<$1mark>',
);
