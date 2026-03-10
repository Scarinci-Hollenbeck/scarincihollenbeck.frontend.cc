import React, { useCallback, useRef, useState } from 'react';
import Script from 'next/script';
import { FormContainer } from 'styles/attorney-page/GetInTouchForm.styles';
import {
  SubscriptionFormContainer,
  SubscriptionFormTitle,
} from 'styles/SubscriptionForm.style';
import {
  RECAPTCHA_SITE_KEY,
  SITE_TITLE,
  subscriptionInputs,
  THANKS_MESSAGE,
} from 'utils/constants';
import { useRouter } from 'next/router';
import empty from 'is-empty';
import { StandardBlueButton } from 'styles/Buttons.style';
import RenderInputs from 'components/shared/ContactForm/RenderInputs';
import SubscriptionsAccordion from 'components/atoms/SubscriptionsAccordion';
import {
  ChoseButton,
  ChoseButtons,
  SubscriptionAccordionCollapse,
} from 'styles/SuscriptionsAccordion.style';
import { isArraysIdentical, originalItemsIds } from 'utils/helpers';

const SubscriptionForm = ({
  categories = [],
  practices = [],
  industries = [],
}) => {
  const router = useRouter();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [categoriesChosen, setCategoriesChosen] = useState([]);
  const [servicesChosen, setServicesChosen] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const accordionWrapperRef = useRef();
  const allChosenItems = [...servicesChosen, ...categoriesChosen];
  const services = [...practices, ...industries];

  const handleChooseAllClearAll = useCallback(
    (isAllChosen) => {
      if (isAllChosen) {
        setCategoriesChosen(originalItemsIds(categories));
        setServicesChosen(originalItemsIds(services));
        setActiveKeys([
          'category-accordion-subscriptions',
          'services-accordion-subscriptions',
        ]);
      } else {
        setCategoriesChosen([]);
        setServicesChosen([]);
      }

      setTimeout(() => {
        if (accordionWrapperRef.current) {
          accordionWrapperRef.current
            .querySelectorAll('.form-checkbox__input')
            .forEach((checkbox) => {
              checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            });
        }
      }, 0);
    },
    [categories, services],
  );

  return (
    <SubscriptionFormContainer>
      <SubscriptionFormTitle>
        {`Sign up to get the latest from the ${SITE_TITLE} attorneys!`}
      </SubscriptionFormTitle>
      <FormContainer>
        <form
          className="kwes-form"
          action="https://kwes.io/api/foreign/forms/zkAM3capOgEtCtFB2fLD"
          // eslint-disable-next-line react/no-unknown-property
          has-recaptcha-v3=""
          // eslint-disable-next-line react/no-unknown-property
          recaptcha-site-key={RECAPTCHA_SITE_KEY}
          // eslint-disable-next-line react/no-unknown-property
          success-message={THANKS_MESSAGE.title}
          onFocus={() => setRecaptchaLoaded(true)}
        >
          {recaptchaLoaded && (
            <Script
              src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
              strategy="afterInteractive"
            />
          )}
          <RenderInputs
            arrayOfAttributes={subscriptionInputs}
            attorneySlug={router.asPath}
          />

          <ChoseButtons>
            <ChoseButton
              onClick={() => handleChooseAllClearAll(true)}
              disabled={isArraysIdentical(
                allChosenItems,
                originalItemsIds([...categories, ...services]),
              )}
            >
              Select all topics
            </ChoseButton>
            <ChoseButton
              onClick={() => handleChooseAllClearAll(false)}
              disabled={empty(allChosenItems)}
            >
              Clear all topics
            </ChoseButton>
          </ChoseButtons>

          <fieldset
            className="form-checkboxes"
            data-kw-group="true"
            // eslint-disable-next-line react/no-unknown-property
            rules="required"
            ref={accordionWrapperRef}
          >
            <SubscriptionAccordionCollapse activeKey={activeKeys} alwaysOpen>
              <SubscriptionsAccordion
                title="Subscribe to Category"
                items={categories}
                selectedItems={categoriesChosen}
                setSelectedItems={setCategoriesChosen}
                eventKey="category-accordion-subscriptions"
                activeKeys={activeKeys}
                setActiveKeys={setActiveKeys}
              />

              <SubscriptionsAccordion
                title="Subscribe to Services"
                items={services}
                selectedItems={servicesChosen}
                setSelectedItems={setServicesChosen}
                eventKey="services-accordion-subscriptions"
                activeKeys={activeKeys}
                setActiveKeys={setActiveKeys}
              />
            </SubscriptionAccordionCollapse>
          </fieldset>

          <StandardBlueButton
            className="form-button"
            disabled={empty([allChosenItems])}
            type="submit"
          >
            Submit
          </StandardBlueButton>
        </form>
      </FormContainer>
    </SubscriptionFormContainer>
  );
};

export default SubscriptionForm;
