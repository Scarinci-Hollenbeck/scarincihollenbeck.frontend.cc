import { BsXLg } from 'react-icons/bs';
import { ClearButton } from 'styles/Buttons.style';
import {
  SelectionButton,
  SelectionItem,
  SelectionList,
  SelectionWrapper,
} from 'styles/Filters.style';
import { createMarkup } from 'utils/helpers';

const Selection = ({
  keyword, selections, clearAll, clearQuery,
}) => {
  const selectionsWithoutKeyword = selections?.filter(
    (a) => a.key !== 'keyword',
  );

  if (!selectionsWithoutKeyword?.length && !keyword?.length) {
    return null;
  }
  return (
    <SelectionWrapper>
      <SelectionList>
        {keyword?.length > 0 && (
          <SelectionItem>
            <SelectionButton
              variant="Primary"
              id={keyword}
              onClick={() => clearQuery('keyword')}
              data-toggle="tooltip"
              data-placement="top"
              title="Click on link to remove filter"
            >
              <span dangerouslySetInnerHTML={createMarkup(keyword)} />
              <BsXLg />
            </SelectionButton>
          </SelectionItem>
        )}
        {selectionsWithoutKeyword?.map((selection) => (
          <SelectionItem key={selection.key}>
            <SelectionButton
              id={selection.selected}
              onClick={() => clearQuery(selection.key)}
              data-toggle="tooltip"
              data-placement="top"
              data-html="true"
              title="Click on link to remove filter"
            >
              {selection?.selected}
              <BsXLg />
            </SelectionButton>
          </SelectionItem>
        ))}
      </SelectionList>
      {selections?.length > 0 && (
        <ClearButton onClick={clearAll}>Reset Filters</ClearButton>
      )}
    </SelectionWrapper>
  );
};

export default Selection;
