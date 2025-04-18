import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ContactModalBox,
  ContactModalTitle,
  QuestionModalDescription,
  QuestionModalWrapper,
} from 'styles/Modals.style';
import { kwesformsInit } from 'utils/kwesformsInit';
import empty from 'is-empty';
import dynamic from 'next/dynamic';
import QuestionForm from 'components/molecules/library/QuestionForm';
import ModalWindow from 'components/common/ModalWindow';
import { handleQuestionModalOpener } from '../../../redux/slices/modals.slice';
import { useGetAttorneysQuery } from '../../../redux/services/project-api';

const Loader = dynamic(() => import('components/atoms/Loader'));

const QuestionModal = () => {
  const dispatch = useDispatch();
  const { isActiveQuestionModal } = useSelector((store) => store.modals);
  const setIsShowQuestionModal = (value) => dispatch(handleQuestionModalOpener({ active: value }));
  const { data: attorneys, isLoading } = useGetAttorneysQuery();

  useEffect(() => {
    if (isActiveQuestionModal && !empty(attorneys?.data)) {
      (async () => {
        await kwesformsInit();
      })();
    }
  }, [isActiveQuestionModal, attorneys?.data]);

  return (
    <AnimatePresence>
      {isActiveQuestionModal && (
        <QuestionModalWrapper>
          <ModalWindow
            isOpen={isActiveQuestionModal}
            setOpenModal={setIsShowQuestionModal}
            contentProps={{
              as: motion.div,
              initial: { y: -100, opacity: 0, scale: 0 },
              animate: { y: 0, opacity: 1, scale: 1 },
              exit: { y: 100, opacity: 0, scale: 0 },
              transition: { ease: 'easeOut', duration: 0.3, delay: 0 },
              $isDisableTransition: true,
            }}
          >
            <ContactModalBox>
              <ContactModalTitle>Ask a question</ContactModalTitle>
              <QuestionModalDescription>
                Your insights help us shape content that truly matters to our
                readers. If there&apos;s a legal topic you&apos;re curious about
                or a question you&apos;ve always wanted to ask a lawyer — this
                is your chance. Submit your question below, and it might be
                featured (with an answer!) in an upcoming Lawyer Spotlight
                article.
              </QuestionModalDescription>
              {isLoading ? (
                <Loader />
              ) : (
                <QuestionForm attorneys={attorneys?.data} />
              )}
            </ContactModalBox>
          </ModalWindow>
        </QuestionModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default QuestionModal;
