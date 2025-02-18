import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import empty from 'is-empty';
import { setSelectedValues } from '../redux/slices/library.slice';

const getPathnameFromAsPath = (path) => path.split('?')[0].split('#')[0];

const useLibraryFilters = (optionsMap) => {
  const dispatch = useDispatch();
  const { asPath, push, query } = useRouter();
  const { selectedValues } = useSelector((state) => state.library);
  const pathname = getPathnameFromAsPath(asPath);

  useEffect(() => {
    const newSelectedValues = {};

    if (!empty(query) && (Object.keys(query).length > 1 || empty(query.slug))) {
      Object.entries(query).forEach(([key, id]) => {
        const option = optionsMap[key]?.find(
          (item) => item?.databaseId?.toString() === id || item?.id?.toString() === id,
        );
        if (option && key !== 'keyword') {
          newSelectedValues[key] = {
            value: option.title,
            id: option.id ?? option.databaseId,
            slug: option.uri ?? option.slug,
          };
        }

        if (key === 'keyword') {
          newSelectedValues[key] = {
            value: id,
            id,
          };
        }
      });
    }

    if (JSON.stringify(newSelectedValues) !== JSON.stringify(selectedValues)) {
      dispatch(setSelectedValues(newSelectedValues));
    }
  }, [query]);

  const handleChangeSelect = useCallback(
    (item, key, isDefault) => {
      const {
        title, id, databaseId, slug, uri,
      } = item;
      const itemId = databaseId || id;
      const itemUri = uri || slug;
      const newSelectedValues = { ...selectedValues };

      if (isDefault) {
        delete newSelectedValues[key];
      } else if (
        newSelectedValues[key]?.value !== title
        || newSelectedValues[key]?.id !== itemId
        || newSelectedValues[key]?.slug !== itemUri
      ) {
        newSelectedValues[key] = { value: title, id: itemId, slug: itemUri };
      }

      if (JSON.stringify(selectedValues) === JSON.stringify(newSelectedValues)) return;

      dispatch(setSelectedValues(newSelectedValues));
    },
    [dispatch, selectedValues],
  );

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      const newSelectedValues = { ...selectedValues };

      if (empty(value)) {
        delete newSelectedValues.keyword;
      } else {
        newSelectedValues.keyword = {
          value,
          id: value,
        };
      }

      dispatch(setSelectedValues(newSelectedValues));
    },
    [dispatch, selectedValues],
  );

  const handleSearch = useCallback(
    (e) => {
      if (empty(selectedValues)) return;
      e.preventDefault();

      if (Object.keys(selectedValues).length === 1) {
        const selectedCategories = selectedValues?.categories?.slug;
        const selectedAuthors = selectedValues?.authors?.slug;

        if (!empty(selectedCategories)) {
          const newUrl = selectedCategories;
          if (getPathnameFromAsPath(asPath) !== newUrl) {
            push(newUrl);
          }
          return;
        }

        if (!empty(selectedAuthors)) {
          const newUrl = `/library${selectedAuthors}`;
          if (getPathnameFromAsPath(asPath) !== newUrl) {
            push(newUrl);
          }
          return;
        }
      }

      const queryValues = Object.entries(selectedValues).reduce(
        (acc, [key, { id }]) => {
          if (id) {
            acc[key] = id;
          }
          return acc;
        },
        {},
      );

      const queryLimit = query?.limit;

      const newQuery = {
        pathname: '/library/search',
        query: {
          ...queryValues,
          ...(queryLimit && { limit: queryLimit }),
        },
      };

      if (
        asPath !== `${newQuery.pathname}?${new URLSearchParams(newQuery.query)}`
      ) {
        push(newQuery, undefined, { scroll: false });
      }
    },
    [selectedValues, push, asPath, query],
  );

  const handleClearAll = useCallback(() => {
    dispatch(setSelectedValues({}));

    if (asPath !== '/library/search') {
      push('/library/search', undefined, { scroll: false });
    }
  }, [dispatch, asPath]);

  const handleClearSelection = useCallback(
    (key) => {
      const newSelectedValues = { ...selectedValues };
      delete newSelectedValues[key];
      dispatch(setSelectedValues(newSelectedValues));

      if (empty(newSelectedValues) && asPath !== '/library/search') {
        push('/library/search', undefined, { scroll: false });
      }
    },
    [dispatch, selectedValues, asPath],
  );

  return {
    selectedValues,
    pathname,
    handleChangeSelect,
    handleInputChange,
    handleSearch,
    handleClearAll,
    handleClearSelection,
  };
};

export default useLibraryFilters;
