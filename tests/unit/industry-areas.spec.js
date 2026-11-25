import { test, expect } from '@playwright/test';
import {
  areaIndexForKey,
  areaNumber,
  nextAreaIndex,
  splitRelatedPractices,
} from '../../utils/industry-areas';

const link = (slug, name) => `<a href="https://scarincihollenbeck.com/practices/${slug}" target="_blank" rel="noopener noreferrer nofollow">${name}</a>`;

test('the "Related practices" line leaves the text and becomes one item per link', () => {
  const html = `<p>We help clients evaluate sites.</p>
<p data-lfile-container="x">Related practices: ${link(
    'commercial-real-estate',
    'Commercial Real Estate',
  )}, ${link('appellate-practice', 'Appellate Practice')}</p>
`;
  const { html: text, practices } = splitRelatedPractices(html);

  expect(text).toBe('<p>We help clients evaluate sites.</p>');
  expect(practices).toEqual([
    link('commercial-real-estate', 'Commercial Real Estate'),
    link('appellate-practice', 'Appellate Practice'),
  ]);
});

test('a bold label and different case still count as the line', () => {
  const html = `<p>Text.</p><p><strong>Related Practices:</strong> ${link(
    'tax',
    'Tax',
  )}</p>`;
  expect(splitRelatedPractices(html).practices).toEqual([link('tax', 'Tax')]);
  expect(splitRelatedPractices(html).html).toBe('<p>Text.</p>');
});

test('names written without links stay together as one item', () => {
  const { practices } = splitRelatedPractices(
    '<p>Text.</p><p>Related practices: Tax, Real Estate</p>',
  );
  expect(practices).toEqual(['Tax, Real Estate']);
});

test('text that only mentions related practices mid-paragraph is left alone', () => {
  const html = '<p>We coordinate with related practices: tax and labor.</p>';
  expect(splitRelatedPractices(html)).toEqual({ html, practices: [] });
});

test('no line, empty or missing HTML: nothing for the column', () => {
  expect(splitRelatedPractices('<p>Only text.</p>')).toEqual({
    html: '<p>Only text.</p>',
    practices: [],
  });
  expect(splitRelatedPractices('')).toEqual({ html: '', practices: [] });
  expect(splitRelatedPractices(null)).toEqual({ html: '', practices: [] });
});

test('"Next" after the last area goes back to the first', () => {
  expect(nextAreaIndex(0, 11)).toBe(1);
  expect(nextAreaIndex(10, 11)).toBe(0);
  expect(nextAreaIndex(0, 1)).toBe(0);
});

test('arrow keys move along the headings and wrap, Home and End jump to the ends', () => {
  expect(areaIndexForKey('ArrowRight', 0, 3)).toBe(1);
  expect(areaIndexForKey('ArrowDown', 2, 3)).toBe(0);
  expect(areaIndexForKey('ArrowLeft', 0, 3)).toBe(2);
  expect(areaIndexForKey('ArrowUp', 1, 3)).toBe(0);
  expect(areaIndexForKey('Home', 2, 3)).toBe(0);
  expect(areaIndexForKey('End', 0, 3)).toBe(2);
  expect(areaIndexForKey('Enter', 0, 3)).toBeNull();
  expect(areaIndexForKey('ArrowRight', 0, 0)).toBeNull();
});

test('area numbers have two digits', () => {
  expect(areaNumber(0)).toBe('01');
  expect(areaNumber(10)).toBe('11');
});
