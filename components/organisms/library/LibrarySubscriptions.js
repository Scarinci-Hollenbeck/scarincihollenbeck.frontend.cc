import SubscriptionForm from 'components/shared/forms/SubscriptionForm';
import React from 'react';
import {
  LibrarySubscriptionsContainer,
  LibrarySubscriptionsSection,
} from 'styles/library/LibrarySubscriptions.style';

const LibrarySubscriptions = ({ categories, practices, industries }) => (
  <LibrarySubscriptionsSection>
    <LibrarySubscriptionsContainer>
      <SubscriptionForm
        categories={categories}
        practices={practices}
        industries={industries}
      />
    </LibrarySubscriptionsContainer>
  </LibrarySubscriptionsSection>
);

export default LibrarySubscriptions;
