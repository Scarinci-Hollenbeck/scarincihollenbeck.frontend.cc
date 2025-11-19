import { memo, useCallback } from 'react';
import {
  ChildrenBox,
  ModalCloser,
  ModalContainer,
  ModalContent,
} from '../../styles/ModalWindow.style';

const ModalWindow = ({
  children, isOpen, setOpenModal, contentProps,
}) => {
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const autoStopPropagation = useCallback(
    (event) => event.stopPropagation(),
    [],
  );

  return (
    <ModalContainer $isOpen={isOpen} onMouseDown={handleCloseModal}>
      <ModalContent
        $isOpen={isOpen}
        className={isOpen ? 'modal-open' : ''}
        onMouseDown={autoStopPropagation}
        {...contentProps}
      >
        <ModalCloser
          aria-label="Close modal"
          onClick={handleCloseModal}
          className="modal-closer"
        />
        <ChildrenBox>{children}</ChildrenBox>
      </ModalContent>
    </ModalContainer>
  );
};

export default memo(ModalWindow);
