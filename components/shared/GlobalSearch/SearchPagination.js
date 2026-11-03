import React from 'react';
import { usePagination } from 'react-instantsearch';

// Reproduces the markup of the react-instantsearch-dom 6 Pagination widget
// (first/previous/pages/next, disabled links as <span>, 7 pages around the
// current one): the styles in GlobalSearch.style.js are written against it.

const PADDING = 3;

// v6 page window, 1-based.
const getPages = (current, maxPages) => {
  const size = Math.min(2 * PADDING + 1, maxPages);
  let paddingLeft = PADDING + 1;
  if (current <= PADDING) paddingLeft = current;
  else if (current >= maxPages - PADDING) paddingLeft = size - (maxPages - current);
  const first = size === maxPages ? 0 : current - paddingLeft;
  return Array.from({ length: size }, (_, i) => first + i + 1);
};

const isSpecialClick = (e) => e.button === 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

const cx = (...elements) => elements
  .filter((element) => element || element === '')
  .map((element) => (element ? `ais-Pagination-${element}` : 'ais-Pagination'))
  .join(' ');

const SearchPagination = ({ totalPages, visible }) => {
  const {
    currentRefinement, nbPages, canRefine, refine, createURL,
  } = usePagination({ totalPages, padding: PADDING });
  if (!visible) return null;
  const current = currentRefinement + 1;

  const items = [
    {
      key: 'first',
      modifier: 'item--firstPage',
      disabled: current === 1,
      label: '«',
      value: 1,
      ariaLabel: 'First page',
    },
    {
      key: 'previous',
      modifier: 'item--previousPage',
      disabled: current === 1,
      label: '‹',
      value: current - 1,
      ariaLabel: 'Previous page',
    },
    ...getPages(current, nbPages).map((value) => ({
      key: value,
      modifier: 'item--page',
      label: String(value),
      value,
      selected: value === current,
      ariaLabel: `Page ${value}`,
    })),
    {
      key: 'next',
      modifier: 'item--nextPage',
      disabled: current === nbPages || nbPages <= 1,
      label: '›',
      value: current + 1,
      ariaLabel: 'Next page',
    },
  ];

  return (
    <div className={cx('', !canRefine && '-noRefinement')}>
      <ul className={cx('list', !canRefine && 'list--noRefinement')}>
        {items.map((item) => (
          <li
            key={item.key}
            className={cx(
              'item',
              item.selected && !item.disabled && 'item--selected',
              item.disabled && 'item--disabled',
              item.modifier,
            )}
          >
            {item.disabled ? (
              <span className={cx('link')}>{item.label}</span>
            ) : (
              <a
                className={cx('link', item.selected && 'link--selected')}
                aria-label={item.ariaLabel}
                href={createURL(item.value - 1)}
                onClick={(e) => {
                  if (isSpecialClick(e)) return;
                  e.preventDefault();
                  refine(item.value - 1);
                }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPagination;
