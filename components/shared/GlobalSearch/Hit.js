import {
  SearchableItemFooter,
  SearchableItemLabel,
  SearchableItemText,
  SearchableItemTitle,
  SearchedItem,
  SearchedItemContent,
  SearchedItemIcon,
  SearchedItemLink,
} from 'styles/Hit.style';
import { Highlight } from 'react-instantsearch-dom';
import empty from 'is-empty';
import { getIcon } from 'utils/getIcon';
import { changeTitle } from '../../../utils/helpers';
import { BASE_API_URL, PRODUCTION_URL } from '../../../utils/constants';

export default function Hit({ hit, setIsOpenSearch, handleClear }) {
  // eslint-disable-next-line no-underscore-dangle
  if (!empty(hit._highlightResult?.post_title?.value)) {
    // eslint-disable-next-line no-underscore-dangle
    hit._highlightResult.post_title.value = changeTitle(
      // eslint-disable-next-line no-underscore-dangle
      hit._highlightResult.post_title.value,
    );
  }

  const handleClickItem = (e) => {
    e.stopPropagation();
    if (setIsOpenSearch) {
      setIsOpenSearch(false);
    }
    handleClear();
  };

  return (
    <SearchedItem onClick={handleClickItem}>
      <SearchedItemLink
        href={
          hit.post_type_label === 'Posts'
            ? hit.permalink?.replace(PRODUCTION_URL, '')
            : hit.permalink?.replace(BASE_API_URL, '')
        }
        passHref
      >
        <SearchedItemIcon>
          {getIcon(hit.post_type_label) ?? getIcon('Practices')}
        </SearchedItemIcon>
        <SearchedItemContent>
          <SearchableItemTitle>
            <Highlight hit={hit} attribute="post_title" />
          </SearchableItemTitle>
          {hit.post_type === 'post' && (
            <SearchableItemFooter>
              <SearchableItemLabel>
                Author:
                {' '}
                {hit.post_author.display_name}
              </SearchableItemLabel>
              <SearchableItemText>
                {changeTitle(hit.post_date_formatted)}
              </SearchableItemText>
            </SearchableItemFooter>
          )}
        </SearchedItemContent>
      </SearchedItemLink>
    </SearchedItem>
  );
}
