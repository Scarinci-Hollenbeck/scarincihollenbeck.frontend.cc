import ModalWindow from 'components/common/ModalWindow';
import Image from 'next/image';
import React, { useId, useRef, useState } from 'react';
import { FormContainer } from 'styles/attorney-page/GetInTouchForm.styles';
import {
  CheckBoxesList,
  FormSubscriptionContainer,
  FormSubscriptionHeader,
  FormSubscriptionHeaderText,
} from 'styles/Subscription.style';
import {
  RECAPTCHA_SITE_KEY,
  SITE_TITLE,
  subscriptionInputs,
  THANKS_MESSAGE,
} from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import empty from 'is-empty';
import Loader from 'components/atoms/Loader';
import { StandardBlueButton } from 'styles/Buttons.style';
import { SubscriptionModalWrapper } from 'styles/ContactModal.style';
import { handleSubscriptionModalOpener } from '../../redux/slices/modals.slice';
import SHDiamond from '../../public/images/sh-mini-diamond-PNG.svg';
import RenderInputs from './ContactForm/RenderInputs';

const isArraysIdentical = (chosenIds, originalIds) => {
  if (chosenIds.length !== originalIds?.length) {
    return false;
  }
  return chosenIds.every((element, index) => element === originalIds[index]);
};

const originalCategoriesIds = (categoryArr) => categoryArr?.map((category) => category.id);

const SubscriptionModal = ({ categoriesFromWP }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const useIdVar = useId();
  const fieldsetRef = useRef(null);
  const [categoriesChosen, setCategories] = useState([]);
  const { isActiveSubscriptionModal, customSubscriptionModalClassName } = useSelector((store) => store.modals);
  const setIsShowContactModal = (value) => dispatch(handleSubscriptionModalOpener({ active: value }));

  const handleCheckCategory = (categoryId) => {
    if (categoriesChosen.includes(categoryId)) {
      setCategories(
        categoriesChosen.filter(
          (categoryIdChosen) => categoryIdChosen !== categoryId,
        ),
      );
    } else {
      setCategories([...categoriesChosen, categoryId]);
    }
  };

  const handleChooseAllClearAll = (isAllChosen) => {
    const newCategories = isAllChosen
      ? originalCategoriesIds(categoriesFromWP)
      : [];
    setCategories(newCategories);

    setTimeout(() => {
      if (fieldsetRef.current) {
        fieldsetRef.current
          .querySelectorAll('.form-checkbox__input')
          .forEach((checkbox) => {
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
          });
      }
    }, 0);
  };

  return (
    <SubscriptionModalWrapper className={customSubscriptionModalClassName}>
      <ModalWindow
        isOpen={isActiveSubscriptionModal}
        setOpenModal={setIsShowContactModal}
      >
        <FormSubscriptionContainer>
          <FormSubscriptionHeader>
            <Image
              className="modal-subscription-logo"
              src={SHDiamond}
              width={80}
              height={80}
              alt={`${SITE_TITLE} diamond`}
              loading="lazy"
              sizes="80px"
            />
            <FormSubscriptionHeaderText>
              {`Sign up to get the latest from the ${SITE_TITLE} attorneys!`}
            </FormSubscriptionHeaderText>
          </FormSubscriptionHeader>
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
            >
              <RenderInputs
                arrayOfAttributes={subscriptionInputs}
                attorneySlug={router.asPath}
              />
              <fieldset
                className="form-checkboxes"
                data-kw-group="true"
                ref={fieldsetRef}
                // eslint-disable-next-line react/no-unknown-property
                rules="required"
              >
                <span className="form-checkboxes__label">
                  Please select a category(s) below:
                </span>
                <div className="btn-choose-box">
                  <Button
                    variant="link"
                    onClick={() => handleChooseAllClearAll(true)}
                    disabled={isArraysIdentical(
                      categoriesChosen,
                      originalCategoriesIds(categoriesFromWP),
                    )}
                  >
                    Select all
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleChooseAllClearAll(false)}
                    disabled={empty(categoriesChosen)}
                  >
                    Clear all
                  </Button>
                </div>
                <CheckBoxesList>
                  {!empty(categoriesFromWP) ? (
                    <>
                      {categoriesFromWP?.map(({ id, name }) => (
                        <li key={`${useIdVar}${id}`}>
                          <label
                            htmlFor={`${useIdVar}${id}`}
                            className="form-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox__input"
                              id={`${useIdVar}${id}`}
                              name="category"
                              value={name}
                              onChange={() => handleCheckCategory(id)}
                              checked={categoriesChosen?.includes(id)}
                            />
                            <span className="form-checkbox__icon" />
                            <span className="form-checkbox__label">{name}</span>
                          </label>
                        </li>
                      ))}
                    </>
                  ) : (
                    <Loader />
                  )}
                </CheckBoxesList>
              </fieldset>
              <StandardBlueButton
                className="form-button"
                disabled={empty(categoriesChosen)}
                type="submit"
              >
                Submit
              </StandardBlueButton>
            </form>
          </FormContainer>
        </FormSubscriptionContainer>
      </ModalWindow>
    </SubscriptionModalWrapper>
  );
};

export default SubscriptionModal;
