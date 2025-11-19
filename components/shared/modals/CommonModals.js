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
  const [subscriptionsFromWP, setSubscriptionsFromWP] = useState({});

  useEffect(() => {
    (async () => {
      const subscriptions = await fetch('/api/revalidate-subscriptions');
      const resDecoded = await decodeResponse(subscriptions);
      if (!empty(resDecoded?.data)) {
        setSubscriptionsFromWP(resDecoded?.data);
      }
    })();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      if (empty(subscriptionsFromWP)) return;

      kwesformsInit();
    };

    handleRouteChange();

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [subscriptionsFromWP]);

  return (
    <>
      <ContactModal />
      <SubscriptionModal
        categoriesFromWP={subscriptionsFromWP?.categories}
        practices={subscriptionsFromWP?.practices}
        industries={subscriptionsFromWP?.industries}
      />
      <QuestionModal />
    </>
  );
};

export default CommonModals;
