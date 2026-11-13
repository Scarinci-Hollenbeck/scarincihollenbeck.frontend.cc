/**
 * Self-referencing URL of a paginated listing: `?page=N` is kept for N > 1, so
 * page 2 does not declare page 1 as its canonical (tasks #11). Other query
 * parameters (filters) are dropped; anything that is not a whole number above
 * 1 gives the first page.
 */
export const paginatedUrl = (baseUrl, page) => {
  const value = Array.isArray(page) ? page[0] : page;
  if (!/^\d+$/.test(String(value ?? ''))) return baseUrl;
  const pageNumber = Number(value);
  return pageNumber > 1 ? `${baseUrl}?page=${pageNumber}` : baseUrl;
};
