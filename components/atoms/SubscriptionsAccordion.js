import React, { useCallback, useId, useRef } from 'react';
import empty from 'is-empty';
import { Accordion } from 'react-bootstrap';
import Loader from 'react-spinners/ClockLoader';
import {
  CheckboxesList,
  ChoseButton,
  ChoseButtons,
  SubscriptionAccordionCollapse,
} from 'styles/SuscriptionsAccordion.style';
import { isArraysIdentical, originalItemsIds } from 'utils/helpers';

const SubscriptionsAccordion = ({
  title,
  items,
  selectedItems,
  setSelectedItems,
  eventKey,
  activeKeys,
  setActiveKeys,
}) => {
  const checkboxesWrapperRef = useRef(null);
  const accordionId = useId();

  const handleCheckItem = useCallback(
    (itemId) => {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(
          selectedItems.filter((itemsIdChosen) => itemsIdChosen !== itemId),
        );
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    },
    [selectedItems, setSelectedItems],
  );

  const handleChooseAllClearAll = useCallback(
    (isAllChosen) => {
      const newItems = isAllChosen ? originalItemsIds(items) : [];
      setSelectedItems(newItems);

      setTimeout(() => {
        if (checkboxesWrapperRef.current) {
          checkboxesWrapperRef.current
            .querySelectorAll('.form-checkbox__input')
            .forEach((checkbox) => {
              checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            });
        }
      }, 0);
    },
    [items, setSelectedItems],
  );

  const accordionClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (activeKeys.includes(eventKey)) {
        setActiveKeys(activeKeys.filter((key) => key !== eventKey));
      } else {
        setActiveKeys([...activeKeys, eventKey]);
      }
    },
    [activeKeys, eventKey, setActiveKeys],
  );

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header as="p" onClick={accordionClick}>
        {title}
      </Accordion.Header>
      <Accordion.Body>
        <ChoseButtons>
          <ChoseButton
            onClick={() => handleChooseAllClearAll(true)}
            disabled={isArraysIdentical(selectedItems, originalItemsIds(items))}
          >
            Select all
          </ChoseButton>
          <ChoseButton
            onClick={() => handleChooseAllClearAll(false)}
            disabled={empty(selectedItems)}
          >
            Clear all
          </ChoseButton>
        </ChoseButtons>
        <CheckboxesList ref={checkboxesWrapperRef}>
          {!empty(items) ? (
            <>
              {items?.map(({ databaseId, title }) => (
                <li key={`${accordionId}${databaseId}`}>
                  <label
                    htmlFor={`${accordionId}-${databaseId}`}
                    className="form-checkbox"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox__input"
                      id={`${accordionId}-${databaseId}`}
                      name="category"
                      value={title}
                      onChange={() => handleCheckItem(databaseId)}
                      checked={selectedItems?.includes(databaseId)}
                    />
                    <span className="form-checkbox__icon" />
                    <span className="form-checkbox__label">{title}</span>
                  </label>
                </li>
              ))}
            </>
          ) : (
            <Loader />
          )}
        </CheckboxesList>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SubscriptionsAccordion;
