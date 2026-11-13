// next/image lists every configured width (32 to 1920, 13 URLs) in srcSet
// whenever `sizes` holds pixel values only, so each card image costs about
// 3 kB of HTML (tasks #13: /attorneys carried 216 kB of srcSet).
// trimSrcSet keeps the entries a browser actually picks: for every slot size
// in `sizes` at 1x, 2x and 3x, the smallest width that covers it (or the
// largest one). Browsers take the smallest candidate covering slot * density,
// so at 1x, 2x and 3x they load the same file as with the full list, and at
// fractional densities the same or a larger one, never a smaller one.

const DENSITIES = [1, 2, 3];

// Slot widths of a `sizes` value made of pixel lengths only, e.g.
// '(max-width: 768px) 144px, 200px' -> [144, 200]. Anything else (vw, %,
// calc) depends on the viewport, so it returns null and srcSet stays as is.
export const slotWidths = (sizes) => {
  if (!sizes || !sizes.trim()) return null;
  const slots = sizes.split(',').map((entry) => {
    const match = entry.trim().match(/(?:^|\s)(\d+(?:\.\d+)?)px$/);
    return match ? Number(match[1]) : null;
  });
  return slots.includes(null) ? null : slots;
};

export const trimSrcSet = (srcSet, sizes) => {
  const slots = slotWidths(sizes);
  if (!srcSet || !slots) return srcSet;

  const entries = srcSet.split(', ').map((entry) => {
    const match = entry.match(/ (\d+)w$/);
    return { entry, width: match ? Number(match[1]) : null };
  });
  if (entries.some(({ width }) => width === null)) return srcSet;

  const widths = entries.map(({ width }) => width).sort((a, b) => a - b);
  const largest = widths[widths.length - 1];
  const keep = new Set();
  slots.forEach((slot) => DENSITIES.forEach((density) => {
    keep.add(widths.find((width) => width >= slot * density) || largest);
  }));

  return entries
    .filter(({ width }) => keep.has(width))
    .map(({ entry }) => entry)
    .join(', ');
};

export default trimSrcSet;
