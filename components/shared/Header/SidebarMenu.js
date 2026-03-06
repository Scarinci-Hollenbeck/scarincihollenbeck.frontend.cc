import React, { memo, useMemo } from 'react';
import {
  SidebarMenuBackdrop,
  SidebarMenuButton,
  SidebarMenuButtonIcon,
  SidebarMenuButtons,
  SidebarMenuContainer,
  SidebarMenuFooter,
  SidebarMenuLink,
  SidebarMenuLinks,
  SidebarMenuSocial,
  SidebarMenuSocialIcon,
  SidebarMenuSocials,
  SidebarMenuWrapper,
} from 'styles/Sidebar.style';
import {
  MAKE_A_PAYMENT,
  SIDEBAR_POLITIC_LINKS,
  SOCIAL_LINKS,
  FIRM_PAGES,
} from 'utils/constants';
import { ButtonRed } from 'styles/Buttons.style';
import Navigation from 'components/organisms/Navbar/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import empty from 'is-empty';
import { getIcon } from 'utils/getIcon';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';
import SidebarMenuItems from './SidebarMenuItems';

const SidebarMenuWrapperMotion = motion(SidebarMenuWrapper);
const SidebarMenuBackdropMotion = motion(SidebarMenuBackdrop);

const createMenuData = (practices, locations, industries) => [
  {
    databaseId: 'menu-01',
    title: 'Homepage',
    icon: getIcon('Home'),
    href: '/',
  },
  {
    databaseId: 'menu-02',
    title: 'Attorneys',
    icon: getIcon('Attorneys'),
    href: '/attorneys',
  },
  {
    databaseId: 'menu-03',
    title: 'Legal Practices',
    icon: getIcon('Practices'),
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-practices',
        uri: '/services',
        title: 'View all practices',
        additionalClass: 'bolder',
      },
      ...practices,
    ],
  },
  {
    databaseId: 'menu-04',
    title: 'Industries',
    icon: getIcon('Industries'),
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-industries',
        uri: '/services#industries',
        title: 'View all industries',
        additionalClass: 'bolder',
      },
      ...industries,
    ],
  },
  {
    databaseId: 'menu-05',
    title: 'Locations',
    icon: getIcon('Locations'),
    href: '/location/new-york',
    list: !empty(locations) ? [...locations] : [],
  },
  {
    databaseId: 'menu-06',
    title: 'Library',
    icon: getIcon('News paper'),
    href: '/',
    list: [
      {
        databaseId: 'menu-lib-00',
        title: 'Library overview',
        uri: '/library',
      },
      {
        databaseId: 'menu-lib-01',
        title: 'Client Alerts',
        uri: '/library/category/client-alert',
      },
      {
        databaseId: 'menu-lib-02',
        title: 'Firm News',
        uri: '/library/category/firm-news',
      },
      {
        databaseId: 'menu-lib-03',
        title: 'Firm Events',
        uri: '/library/category/firm-events',
      },
      {
        databaseId: 'menu-lib-04',
        title: 'Firm Insights',
        uri: '/library/category/law-firm-insights',
      },
      {
        databaseId: 'menu-lib-05',
        title: 'Subscription',
        uri: '/library/subscriptions',
      },
    ],
  },
  {
    databaseId: 'menu-07',
    title: 'The Firm',
    icon: getIcon('Firm'),
    href: '/',
    list: FIRM_PAGES,
  },
  {
    databaseId: 'menu-08',
    title: 'Careers',
    icon: getIcon('Careers'),
    href: '/careers',
  },
];

const sanitizeIndustries = (data) => {
  if (!data) return [];

  return data?.map((item) => ({
    databaseId: item?.databaseId,
    uri: item?.uri,
    title: item?.title,
  }));
};

const SidebarMenu = memo(
  ({
    practices, locations, industries, isSidebarOpen, setIsSidebarOpen,
  }) => {
    const dispatch = useDispatch();
    const { headerSize } = useSelector((state) => state.sizes);

    const menuData = useMemo(
      () => createMenuData(practices, locations, sanitizeIndustries(industries)),
      [practices, locations, industries],
    );

    return (
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <SidebarMenuWrapperMotion
              key="sidebar-menu-motion"
              className={isSidebarOpen ? 'sidebar-open' : ''}
              inert={isSidebarOpen ? undefined : ''}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: `calc(100dvh - ${headerSize.height}px)`,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <SidebarMenuContainer>
                <Navigation
                  key="header-navigation"
                  practices={practices}
                  locations={locations}
                  industries={industries}
                  setIsSidebarOpen={setIsSidebarOpen}
                />

                <SidebarMenuItems
                  menuData={menuData}
                  setIsSidebarOpen={setIsSidebarOpen}
                />

                <SidebarMenuLinks>
                  {SIDEBAR_POLITIC_LINKS?.map((item) => (
                    <SidebarMenuLink
                      key={item?.databaseId}
                      href={item?.uri}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item?.title}
                    </SidebarMenuLink>
                  ))}
                </SidebarMenuLinks>
              </SidebarMenuContainer>

              <SidebarMenuFooter>
                <SidebarMenuContainer>
                  <SidebarMenuButtons>
                    <ButtonRed
                      href="/contact-us"
                      className="sidebar-contact-btn"
                    >
                      Contact us
                    </ButtonRed>
                    <button
                      onClick={() => dispatch(
                        handleSubscriptionModalOpener({ active: true }),
                      )}
                      className="sidebar-subscription-btn"
                    >
                      <SidebarMenuButtonIcon>
                        {getIcon('MailingList')}
                      </SidebarMenuButtonIcon>
                      Join our mailing list
                    </button>

                    <SidebarMenuButton
                      href={MAKE_A_PAYMENT}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SidebarMenuButtonIcon>
                        {getIcon('Payment')}
                      </SidebarMenuButtonIcon>
                      Make payment
                    </SidebarMenuButton>
                  </SidebarMenuButtons>

                  <SidebarMenuSocials>
                    {SOCIAL_LINKS.map((item) => (
                      <SidebarMenuSocial
                        key={item?.id}
                        href={item?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SidebarMenuSocialIcon>
                          {item?.icon}
                        </SidebarMenuSocialIcon>
                        {item?.title}
                      </SidebarMenuSocial>
                    ))}
                  </SidebarMenuSocials>
                </SidebarMenuContainer>
              </SidebarMenuFooter>
            </SidebarMenuWrapperMotion>

            <SidebarMenuBackdropMotion
              key="sidebar-menu-backdrop"
              $headerHeight={headerSize.height}
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    );
  },
);

export default SidebarMenu;
