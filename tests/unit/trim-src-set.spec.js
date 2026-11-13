import { test, expect } from '@playwright/test';
import { trimSrcSet, slotWidths } from '../../utils/trim-src-set';

// The widths next/image lists for a `sizes` made of pixel values only:
// imageSizes + deviceSizes from next.config.js.
const ALL = [32, 48, 64, 96, 128, 256, 384, 576, 768, 992, 1200, 1456, 1920];
const srcSetOf = (widths) => widths.map((w) => `/_next/image?url=a&w=${w}&q=80 ${w}w`).join(', ');
const widthsOf = (srcSet) => srcSet.split(', ').map((entry) => Number(entry.split(' ')[1].slice(0, -1)));

// What a browser picks: the smallest candidate covering slot * density,
// or the largest one when none does.
const pick = (widths, slot, dpr) => [...widths].sort((a, b) => a - b).find((w) => w >= slot * dpr)
  || Math.max(...widths);

test('reads the slot sizes and ignores the media conditions', () => {
  expect(slotWidths('400px')).toEqual([400]);
  expect(slotWidths('(max-width: 768px) 144px, 200px')).toEqual([144, 200]);
  expect(
    slotWidths('(max-width: 992px) 360px, (max-width: 1680px) 400px, 500px'),
  ).toEqual([360, 400, 500]);
});

test('leaves sizes that depend on the viewport alone', () => {
  expect(slotWidths('100vw')).toBeNull();
  expect(slotWidths('(max-width: 768px) 100vw, 900px')).toBeNull();
  expect(slotWidths('calc(100% - 20px)')).toBeNull();
  expect(slotWidths('')).toBeNull();
  const full = srcSetOf(ALL);
  expect(trimSrcSet(full, '(max-width: 576px) 100vw, 280px')).toBe(full);
});

test('keeps only the files picked at 1x, 2x and 3x', () => {
  expect(widthsOf(trimSrcSet(srcSetOf(ALL), '400px'))).toEqual([
    576, 992, 1200,
  ]);
  expect(widthsOf(trimSrcSet(srcSetOf(ALL), '130px'))).toEqual([256, 384, 576]);
  expect(
    widthsOf(trimSrcSet(srcSetOf(ALL), '(max-width: 768px) 144px, 200px')),
  ).toEqual([256, 384, 576, 768]);
});

test('a browser picks the same file as before at 1x, 2x and 3x, never a smaller one in between', () => {
  [
    '400px',
    '130px',
    '440px',
    '500px',
    '(max-width: 768px) 144px, 200px',
  ].forEach((sizes) => {
    const trimmed = widthsOf(trimSrcSet(srcSetOf(ALL), sizes));
    slotWidths(sizes).forEach((slot) => {
      [1, 2, 3].forEach((dpr) => expect(pick(trimmed, slot, dpr)).toBe(pick(ALL, slot, dpr)));
      [1.25, 1.5, 1.75, 2.25, 2.625, 2.75].forEach((dpr) => {
        expect(pick(trimmed, slot, dpr)).toBeGreaterThanOrEqual(
          pick(ALL, slot, dpr),
        );
      });
    });
  });
});

test('keeps the largest file when no candidate covers 3x', () => {
  expect(widthsOf(trimSrcSet(srcSetOf(ALL), '900px'))).toEqual([992, 1920]);
});

test('passes through a srcSet that is missing or not width-based', () => {
  expect(trimSrcSet(undefined, '400px')).toBeUndefined();
  const density = '/a.png?w=576 1x, /a.png?w=992 2x';
  expect(trimSrcSet(density, '400px')).toBe(density);
});
