import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import decodeResponse from 'utils/decodeResponse';
import empty from 'is-empty';
import { kwesformsInit } from 'utils/kwesformsInit';

const ContactModal = dynamic(() => import('components/shared/modals/ContactModal'));
const SubscriptionModal = dynamic(() => import('components/shared/modals/SubscriptionModal'));
const QuestionModal = dynamic(() => import('components/shared/modals/QuestionModal'));

const CommonModals = () => {
  const router = useRouter();
  const [categoriesFromWP, setCategoriesFromWP] = useState();

  useEffect(() => {
    (async () => {
      const blogCategories = await fetch('/api/revalidate-categories');
      const resDecoded = await decodeResponse(blogCategories);
      if (!empty(resDecoded.data)) {
        setCategoriesFromWP(resDecoded.data);
      }
    })();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      if (!categoriesFromWP) return;

      kwesformsInit();
    };

    handleRouteChange();

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [categoriesFromWP]);

  return (
    <>
      <ContactModal />
      <SubscriptionModal categoriesFromWP={categoriesFromWP} />
      <QuestionModal />
    </>
  );
};

export default CommonModals;
