import CustomSelect from 'components/common/Select';
import { useRouter } from 'next/router';
import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  LibraryResultsLine,
  LibraryResultsPostsCount,
} from 'styles/library/LibraryResults.style';

const perPageOptions = [
  {
    title: 12,
    databaseId: '12-per-page',
  },
  {
    title: 24,
    databaseId: '24-per-page',
  },
  {
    title: 48,
    databaseId: '48-per-page',
  },
];

const LibraryResultsCount = memo(({ limit, currentPage, total }) => {
  const router = useRouter();
  const [perPage, setPerPage] = useState(router?.query?.limit || limit);
  const [selectOptions, setSelectOptions] = useState(perPageOptions);

  const { minShowingRows, maxShowingRows } = useMemo(() => {
    const showingRows = currentPage * limit;
    const minShowingRows = showingRows - limit + 1;
    const maxShowingRows = showingRows >= total ? total : showingRows;

    return {
      minShowingRows,
      maxShowingRows,
    };
  }, [limit, currentPage, total]);

  useEffect(() => {
    const updatedOptions = [...perPageOptions];

    // Если в URL нет параметра limit, добавляем limit полученый из результатов запроса
    if (
      !router.query.limit
      && !updatedOptions.some((option) => option.title === limit)
    ) {
      updatedOptions.push({ title: limit, databaseId: `${limit}-per-page` });
    }

    // Если в URL есть параметр limit, добавляем его в options, если его нет
    if (
      router.query.limit
      && !updatedOptions.some(
        (option) => option.title === Number(router.query.limit),
      )
    ) {
      updatedOptions.push({
        title: Number(router.query.limit),
        databaseId: `${router.query.limit}-per-page`,
      });
    }

    // Сортируем options по возрастанию
    updatedOptions.sort((a, b) => a.title - b.title);

    setSelectOptions(updatedOptions);
    setPerPage(router?.query?.limit || limit);
  }, [router.query.limit, limit]);

  const handleChangePerPage = useCallback(
    (value) => {
      setPerPage(value);

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, limit: value, page: 1 },
        },
        undefined,
        { scroll: false },
      );
    },
    [router.query],
  );

  return (
    <LibraryResultsLine>
      <LibraryResultsPostsCount>{`${minShowingRows}-${maxShowingRows} of ${total}`}</LibraryResultsPostsCount>

      <CustomSelect
        options={selectOptions}
        inputValue={perPage}
        placeHolder={`${perPage}`}
        onChange={({ title }) => handleChangePerPage(title)}
      />
    </LibraryResultsLine>
  );
});

export default LibraryResultsCount;
