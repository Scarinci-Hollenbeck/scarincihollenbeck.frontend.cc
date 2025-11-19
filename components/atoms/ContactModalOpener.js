import React from 'react';
import { useDispatch } from 'react-redux';
import { StandardBlueButton } from 'styles/Buttons.style';
import { handleModalOpener } from '../../redux/slices/modals.slice';

const ContactModalOpener = ({
  children,
  asComponent,
  modalVariant,
  ...props
}) => {
  const dispatch = useDispatch();
  const Component = asComponent || StandardBlueButton;

  return (
    <Component
      onClick={() => dispatch(handleModalOpener({ active: true, className: modalVariant }))}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ContactModalOpener;
