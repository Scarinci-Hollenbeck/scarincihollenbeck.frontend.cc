import empty from 'is-empty';
import { fetchRestAPI } from './api';

const sanitizeSubscriptions = (subscriptions) => {
  if (empty(subscriptions)) return [];

  return subscriptions.map((subscription) => ({
    databaseId: subscription?.id,
    title: subscription?.name,
  }));
};

export const getSubscriptions = async () => {
  const { practices, categories, industries } = await fetchRestAPI(
    'subscriptions',
  );
  const sanitizedSubscriptions = {
    practices: sanitizeSubscriptions(practices),
    categories: sanitizeSubscriptions(categories),
    industries: sanitizeSubscriptions(industries),
  };

  return sanitizedSubscriptions;
};
