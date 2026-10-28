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
import { Highlight } from 'react-instantsearch';
import empty from 'is-empty';
import { getIcon } from 'utils/getIcon';
import { changeTitle } from '../../../utils/helpers';
import { BASE_API_URL, PRODUCTION_URL } from '../../../utils/constants';

// Hits carry HTML-escaped highlight values with <mark> tags, and Highlight
// unescapes them (the same five entities as below); changeTitle has to see
// the raw title, as it did in v6.
const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};
const CHARACTERS = Object.fromEntries(
  Object.entries(ENTITIES).map(([entity, character]) => [character, entity]),
);
const unescapeHtml = (value) => value.replace(/&(amp|lt|gt|quot|#39);/g, (e) => ENTITIES[e]);
const escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => CHARACTERS[c]);
const changeHighlightedTitle = (value) => escapeHtml(changeTitle(unescapeHtml(value))).replace(
  /&lt;(\/?)mark&gt;/g,
  '<$1mark>',
);

/* eslint-disable no-underscore-dangle */
const withChangedTitle = (hit) => (empty(hit._highlightResult?.post_title?.value)
  ? hit
  : {
    ...hit,
    _highlightResult: {
      ...hit._highlightResult,
      post_title: {
        ...hit._highlightResult.post_title,
        value: changeHighlightedTitle(
          hit._highlightResult.post_title.value,
        ),
      },
    },
  });
/* eslint-enable no-underscore-dangle */

export default function Hit({ hit, setIsOpenSearch, handleClear }) {
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
            <Highlight
              hit={withChangedTitle(hit)}
              attribute="post_title"
              highlightedTagName="em"
              nonHighlightedTagName="span"
            />
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
