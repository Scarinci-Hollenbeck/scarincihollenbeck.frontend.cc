import { test, expect } from '@playwright/test';
import { changeHighlightedTitle } from '../../utils/highlighted-title';

// What react-instantsearch 7 does to a highlight value before and after us.
const escapeLikeInstantSearch = (raw) => raw
  .replace(
    /[&<>"']/g,
    (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]),
  )
  .replace(/&lt;(\/?)mark&gt;/g, '<$1mark>');
const unescapeLikeHighlight = (value) => value.replace(
  /&(amp|lt|gt|quot|#39);/g,
  (e) => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }[e]),
);

// Text the v6 Highlight showed: changeTitle on the raw value (tags kept).
const shown = (raw) => unescapeLikeHighlight(changeHighlightedTitle(escapeLikeInstantSearch(raw)));

test.describe('changeHighlightedTitle', () => {
  test('decodes the first WordPress entity, as changeTitle did in v6', () => {
    expect(shown('Incentives &amp; <mark>Tax</mark> Credits')).toBe(
      'Incentives & <mark>Tax</mark> Credits',
    );
    expect(shown('A &amp; B &amp; C')).toBe('A & B &amp; C');
    expect(shown('&#8220;<mark>Tax</mark> Talk&#8221;')).toBe(
      '"<mark>Tax</mark> Talk"',
    );
  });

  test('keeps the highlight tags and plain characters', () => {
    expect(shown('x < y > z "q" it\'s')).toBe('x < y > z "q" it\'s');
    expect(shown('<mark>Real</mark> <mark>Estate</mark>')).toBe(
      '<mark>Real</mark> <mark>Estate</mark>',
    );
  });

  test('marks ordinals only when the digits and "th" are not split by a highlight', () => {
    expect(shown('<mark>12th</mark> Annual')).toBe(
      '<mark>12<span>th</span></mark> Annual',
    );
    expect(shown('<mark>12</mark>th Annual')).toBe('<mark>12</mark>th Annual');
  });

  test('returns a value Highlight can parse: only <mark> tags stay unescaped', () => {
    const value = changeHighlightedTitle('<mark>15th</mark> &amp; more');
    expect(value).toBe('<mark>15&lt;span&gt;th&lt;/span&gt;</mark> &amp; more');
  });
});
