import React from 'react';
import { useDispatch } from 'react-redux';
import { StandardBlueButton } from 'styles/Buttons.style';
import { Title20 } from 'styles/common/Typography.style';
import {
  SubscriptionSidebarContent,
  SubscriptionSidebarHolder,
  SubscriptionSidebarBlock,
  SubscriptionSidebarBlockLinks,
  SubscriptionSidebarBlockTitle,
  SubscriptionSidebarText,
} from 'styles/SubscriptionSidebar.style';
import { FIRM_BLOG_PAGES, FIRM_PAGES } from 'utils/constants';
import Link from 'next/link';
import { getIcon } from 'utils/getIcon';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';

const SubscriptionSidebar = ({ isFirmLinks = false }) => {
  const dispatch = useDispatch();
  return (
    <SubscriptionSidebarHolder>
      <SubscriptionSidebarContent>
        <Title20 as="h2">Sign up to get the latest from our attorneys!</Title20>

        <SubscriptionSidebarText>
          Consider subscribing to our Firm Insights mailing list by clicking the
          button below so you can keep up to date with the firm`s latest
          articles covering various legal topics.
        </SubscriptionSidebarText>
      </SubscriptionSidebarContent>

      <SubscriptionSidebarBlock>
        <SubscriptionSidebarBlockTitle>
          <span>{getIcon('News paper')}</span>
          Library
        </SubscriptionSidebarBlockTitle>
        <SubscriptionSidebarBlockLinks>
          {FIRM_BLOG_PAGES.map(({ id, label, slug }) => (
            <li key={id}>
              <Link href={slug}>{label}</Link>
            </li>
          ))}
        </SubscriptionSidebarBlockLinks>
      </SubscriptionSidebarBlock>

      {isFirmLinks && (
        <SubscriptionSidebarBlock>
          <SubscriptionSidebarBlockTitle>
            <span>{getIcon('Firm')}</span>
            The Firm
          </SubscriptionSidebarBlockTitle>
          <SubscriptionSidebarBlockLinks>
            {FIRM_PAGES.map(({ databaseId, title, uri }) => (
              <li title={title} key={databaseId}>
                <Link href={uri}>{title}</Link>
              </li>
            ))}
          </SubscriptionSidebarBlockLinks>
        </SubscriptionSidebarBlock>
      )}

      <StandardBlueButton
        onClick={() => dispatch(handleSubscriptionModalOpener({ active: true }))}
      >
        <span>Subscribe Now!</span>
      </StandardBlueButton>
    </SubscriptionSidebarHolder>
  );
};

export default SubscriptionSidebar;
