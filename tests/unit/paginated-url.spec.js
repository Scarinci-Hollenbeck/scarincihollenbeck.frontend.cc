import { test, expect } from '@playwright/test';
import { paginatedUrl } from '../../utils/paginated-url';

const base = 'https://scarincihollenbeck.com/library/category/firm-news';

test.describe('paginatedUrl', () => {
  test('keeps ?page=N above the first page', () => {
    expect(paginatedUrl(base, '2')).toBe(`${base}?page=2`);
    expect(paginatedUrl(base, '15')).toBe(`${base}?page=15`);
  });

  test('gives the base URL for the first page or no page', () => {
    expect(paginatedUrl(base, undefined)).toBe(base);
    expect(paginatedUrl(base, '1')).toBe(base);
    expect(paginatedUrl(base, '0')).toBe(base);
  });

  test('normalises the number and ignores junk', () => {
    expect(paginatedUrl(base, '02')).toBe(`${base}?page=2`);
    expect(paginatedUrl(base, 'abc')).toBe(base);
    expect(paginatedUrl(base, '2abc')).toBe(base);
    expect(paginatedUrl(base, '-3')).toBe(base);
  });

  test('takes the first value of a repeated parameter', () => {
    expect(paginatedUrl(base, ['3', '4'])).toBe(`${base}?page=3`);
  });
});
