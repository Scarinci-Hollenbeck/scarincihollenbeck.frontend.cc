import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import Link from 'next/link';
import {
  LinkWithEllipsis,
  MainVirtualizeContainer,
  VirtualizeListBox,
  VirtualListItem,
} from '../../../styles/LibraryArticles.style';
import Loader from '../../atoms/Loader';

export default function FirmAuthors({ authors }) {
  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    size: authors.length,
    parentRef,
    paddingStart: 10,
    paddingEnd: 10,
  });

  return (
    <>
      <h5 className="mb-0">
        <strong>Firm Authors</strong>
      </h5>
      {authors.length === 0 ? (
        <Loader />
      ) : (
        <MainVirtualizeContainer ref={parentRef}>
          <VirtualizeListBox height={rowVirtualizer.totalSize}>
            {rowVirtualizer.virtualItems.map((virtualRow) => (
              <VirtualListItem
                key={virtualRow.key}
                ref={virtualRow.measureRef}
                transform={`translateY(${virtualRow.start}px)`}
              >
                <LinkWithEllipsis
                  href={`/library${authors[virtualRow.index].link}`}
                  title={authors[virtualRow.index].fullName}
                >
                  {`☞ ${authors[virtualRow.index].fullName}`}
                </LinkWithEllipsis>
              </VirtualListItem>
            ))}
          </VirtualizeListBox>
        </MainVirtualizeContainer>
      )}
    </>
  );
}
