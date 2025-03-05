import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import empty from 'is-empty';
import {
  CustomPaginationWrapper,
  CustomPaginationItemsCount,
} from 'styles/Pagination';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import useStateScreen from 'hooks/useStateScreen';

const getVisiblePageRange = (
  totalPages,
  currentPage,
  between,
  ellipsis,
  positions,
) => {
  const visiblePageCount = between * 2 + 1;
  const ellipsisAdjustment = ellipsis > 0 ? ellipsis + 1 : 0;

  // Show active without slice
  // Показать все страницы без обрезки
  if (totalPages <= visiblePageCount) return positions;

  // Show active in left
  // Показать страницы, если текущая страница ближе к началу
  if (currentPage - 1 <= between) return positions.slice(0, visiblePageCount - ellipsisAdjustment);

  // Show active in right
  // Показать страницы, если текущая страница ближе к концу
  if (currentPage + between >= totalPages) {
    return positions.slice(
      totalPages - visiblePageCount + ellipsisAdjustment,
      totalPages,
    );
  }

  // Show active in middle
  // Показать страницы вокруг текущей страницы
  return positions.slice(
    currentPage - 1 - (between - ellipsisAdjustment),
    currentPage + (between - ellipsisAdjustment),
  );
};

const calculateBeetween = (between, isMobileScreen) => {
  if (isMobileScreen) return 3;
  if (between < 1) return 1;

  return between;
};

const calculateEllipsis = (ellipsis, between) => {
  if (ellipsis < 1) return 0;
  if (ellipsis + 2 >= between) return between - 2;

  return ellipsis;
};

const CustomPagination = ({
  totalItems,
  currentPage = 1,
  between = 4,
  ellipsis = 1,
  limit,
  queryParam = 'page',
  showFirstAndLastButtons = true,
  showPreviousAndNextButtons = true,
  showCount = true,
  scrollAfterChange = false,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const { isMobileScreen } = useStateScreen();
  const linkQueryParam = `?${queryParam}=`;
  const router = useRouter();
  const { slug, ...routerQueries } = router.query;
  const pageRoute = router.asPath.split('?')[0].split('#')[0];
  between = calculateBeetween(between, isMobileScreen);
  ellipsis = calculateEllipsis(ellipsis, between);
  currentPage = Number(currentPage);
  const showingRows = currentPage * limit;
  const minShowingRows = showingRows - limit + 1;
  const maxShowingRows = showingRows >= totalItems ? totalItems : showingRows;

  const positions = Array.from({ length: totalPages }, (_, i) => i);

  const visiblePages = useMemo(
    () => getVisiblePageRange(
      totalPages,
      currentPage,
      between,
      ellipsis,
      positions,
    ),
    [totalPages, currentPage, between, ellipsis, positions],
  );

  const handleChangePage = (event, page) => {
    event.preventDefault();

    const updatedQuery = page === 1
      ? { ...routerQueries, [queryParam]: undefined }
      : { ...routerQueries, [queryParam]: page };

    router.push(
      {
        pathname: pageRoute,
        query: Object.fromEntries(
          Object.entries(updatedQuery).filter(([_, v]) => v != null),
        ),
      },
      undefined,
      { scroll: scrollAfterChange },
    );
  };

  const renderItemsBeforeEllipsis = () => {
    if (totalPages <= between * 2 + 1 || ellipsis <= 0) {
      return null;
    }

    const startIndex = currentPage - 1 <= between ? 0 : ellipsis;

    if (positions) {
      return positions.slice(0, startIndex).map((value) => (
        <Pagination.Item
          key={value}
          href={
            value !== currentPage - 1
              ? `${pageRoute}${linkQueryParam}${value + 1}`
              : null
          }
          className="pagination-item"
          onClick={(e) => (value !== currentPage - 1 ? handleChangePage(e, value + 1) : {})}
        >
          {value + 1}
        </Pagination.Item>
      ));
    }
  };

  const renderLeftEllipsis = () => {
    // Show left ellipsis if current page bigger than "between"
    if (
      totalPages > between * 2 + 1
      && ellipsis > 0
      && currentPage - 1 > between
    ) return <Pagination.Ellipsis disabled className="pagination-ellipsis" />;

    return null;
  };

  const renderVisiblePages = () => {
    if (!visiblePages) return null;

    return visiblePages.map((value) => (
      <Pagination.Item
        active={value === currentPage - 1}
        key={value}
        href={
          value !== currentPage - 1
            ? `${pageRoute}${linkQueryParam}${value + 1}`
            : null
        }
        className="pagination-item"
        onClick={(e) => (value !== currentPage - 1 ? handleChangePage(e, value + 1) : {})}
      >
        {value + 1}
      </Pagination.Item>
    ));
  };

  const renderRightEllipsis = () => {
    // Show right ellipsis if current page lower than "between"
    if (
      totalPages > between * 2 + 1
      && ellipsis > 0
      && currentPage < totalPages - between
    ) return <Pagination.Ellipsis disabled className="pagination-ellipsis" />;

    return null;
  };

  const renderItemsAfterEllipsis = () => {
    if (totalPages <= between * 2 + 1 || ellipsis <= 0) {
      return null;
    }

    const endIndex = currentPage >= totalPages - between ? totalPages : totalPages - ellipsis;

    if (positions) {
      return positions.slice(endIndex, totalPages).map((value) => (
        <Pagination.Item
          key={value}
          href={
            value !== currentPage - 1
              ? `${pageRoute}${linkQueryParam}${value + 1}`
              : {}
          }
          className="pagination-item"
          onClick={(e) => (value !== currentPage - 1 ? handleChangePage(e, value + 1) : {})}
        >
          {value + 1}
        </Pagination.Item>
      ));
    }
  };

  if (empty(totalPages) || totalPages < 2) return null;

  return (
    <CustomPaginationWrapper>
      {showCount && (
        <CustomPaginationItemsCount>
          {`Showing ${minShowingRows}-${maxShowingRows} of ${
            totalItems || 'Loading...'
          }`}
        </CustomPaginationItemsCount>
      )}
      <Pagination>
        {showFirstAndLastButtons && (
          <Pagination.First
            href={currentPage > 1 ? `${pageRoute}${linkQueryParam}1` : null}
            disabled={currentPage <= 1}
            className="pagination-first"
            onClick={(e) => (currentPage > 1 ? handleChangePage(e, 1) : {})}
          >
            <MdKeyboardDoubleArrowLeft className="pagination-icon" />
          </Pagination.First>
        )}
        {showPreviousAndNextButtons && (
          <Pagination.Prev
            href={
              currentPage > 1
                ? `${pageRoute}${linkQueryParam}${currentPage - 1}`
                : null
            }
            disabled={currentPage <= 1}
            className="pagination-prev"
            onClick={(e) => (currentPage > 1 ? handleChangePage(e, currentPage - 1) : {})}
          >
            <MdKeyboardArrowLeft className="pagination-icon" />
          </Pagination.Prev>
        )}
        {renderItemsBeforeEllipsis()}
        {renderLeftEllipsis()}
        {renderVisiblePages()}
        {renderRightEllipsis()}
        {renderItemsAfterEllipsis()}
        {showPreviousAndNextButtons && (
          <Pagination.Next
            href={
              currentPage < totalPages
                ? `${pageRoute}${linkQueryParam}${currentPage + 1}`
                : null
            }
            disabled={currentPage >= totalPages}
            className="pagination-next"
            onClick={(e) => (currentPage < totalPages
              ? handleChangePage(e, currentPage + 1)
              : {})}
          >
            <MdKeyboardArrowRight className="pagination-icon" />
          </Pagination.Next>
        )}
        {showFirstAndLastButtons && (
          <Pagination.Last
            href={
              currentPage < totalPages
                ? `${pageRoute}${linkQueryParam}${totalPages}`
                : null
            }
            disabled={currentPage >= totalPages}
            className="pagination-last"
            onClick={(e) => (currentPage < totalPages ? handleChangePage(e, totalPages) : {})}
          >
            <MdKeyboardDoubleArrowRight className="pagination-icon" />
          </Pagination.Last>
        )}
      </Pagination>
    </CustomPaginationWrapper>
  );
};

export default CustomPagination;
