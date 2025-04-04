import ModalWindow from 'components/common/ModalWindow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionModalWrapper } from 'styles/ContactModal.style';
import SubscriptionForm from 'components/molecules/common/SubscriptionForm';
import { handleSubscriptionModalOpener } from '../../redux/slices/modals.slice';

const SubscriptionModal = ({ categoriesFromWP, practices, industries }) => {
  const dispatch = useDispatch();
  const { isActiveSubscriptionModal, customSubscriptionModalClassName } = useSelector((store) => store.modals);
  const setIsShowContactModal = (value) => dispatch(handleSubscriptionModalOpener({ active: value }));

  return (
    <SubscriptionModalWrapper className={customSubscriptionModalClassName}>
      <ModalWindow
        isOpen={isActiveSubscriptionModal}
        setOpenModal={setIsShowContactModal}
      >
        <SubscriptionForm
          categories={categoriesFromWP}
          practices={practices}
          industries={industries}
        />
      </ModalWindow>
    </SubscriptionModalWrapper>
  );
};

export default SubscriptionModal;
