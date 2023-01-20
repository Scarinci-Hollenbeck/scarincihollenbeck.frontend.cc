import { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import Link from 'next/link';
import {
  MainVirtualizeContainer,
  VirtualizeListBox,
  VirtualListItem,
} from '../../../styles/LibraryArticles.style';

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
      <MainVirtualizeContainer ref={parentRef}>
        <VirtualizeListBox height={rowVirtualizer.totalSize}>
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <VirtualListItem
              key={virtualRow.key}
              ref={virtualRow.measureRef}
              transform={`translateY(${virtualRow.start}px)`}
            >
              <Link href={`/library/author/${authors[virtualRow.index].username}`}>
                <a>{`☞ ${authors[virtualRow.index].fullName}`}</a>
              </Link>
            </VirtualListItem>
          ))}
        </VirtualizeListBox>
      </MainVirtualizeContainer>
    </>
  );
}
