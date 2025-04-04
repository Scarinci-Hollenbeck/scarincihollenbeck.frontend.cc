import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import decodeResponse from 'utils/decodeResponse';
import empty from 'is-empty';
import {
  useGetIndustriesQuery,
  useGetPracticesQuery,
} from '../../redux/services/project-api';

const ContactModal = dynamic(() => import('components/shared/ContactModal'));
const SubscriptionModal = dynamic(() => import('components/shared/SubscriptionModal'));

const sanitizeCategories = (categories) => !empty(categories)
  && categories.map((category) => ({
    databaseId: category.id,
    title: category.name,
  }));

const CommonModals = () => {
  const router = useRouter();
  const [categoriesFromWP, setCategoriesFromWP] = useState([]);
  const { data: practices } = useGetPracticesQuery();
  const { data: industries } = useGetIndustriesQuery();

  useEffect(() => {
    (async () => {
      const blogCategories = await fetch('/api/revalidate-categories');
      const resDecoded = await decodeResponse(blogCategories);
      if (!empty(resDecoded.data)) {
        setCategoriesFromWP(sanitizeCategories(resDecoded.data));
      }
    })();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      if (
        empty(categoriesFromWP)
        || empty(industries?.data)
        || empty(practices?.data)
      ) return;

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
  }, [categoriesFromWP, industries?.data, practices?.data]);

  return (
    <>
      <ContactModal />
      <SubscriptionModal
        categoriesFromWP={categoriesFromWP}
        practices={practices?.data}
        industries={industries?.data}
      />
    </>
  );
};

export default CommonModals;
