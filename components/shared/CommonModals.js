import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import decodeResponse from 'utils/decodeResponse';
import empty from 'is-empty';

const ContactModal = dynamic(() => import('components/shared/ContactModal'));
const SubscriptionModal = dynamic(() => import('components/shared/SubscriptionModal'));

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

      const kwesforms = await import('kwesforms');
      await kwesforms.init();

      const forms = document.querySelectorAll('.kwes-form');
      forms.forEach((form) => {
        form.className = 'kwes-form-init d-print-none w-100';
      });
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
    </>
  );
};

export default CommonModals;
