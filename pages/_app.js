import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import Header from 'components/shared/Header/Header';
import MainSiteHead from 'components/shared/head/MainSiteHead';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux';

/* *
 *
 * 3rd Party Resources
 *
 * */
import { GoogleTagManager } from '@next/third-parties/google';
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
/* *
 * Custom Style Sheets and redux
 * */
import { GlobalStyle } from 'styles/global_styles/Global.styles';
import InitFonts from 'styles/global_styles/InitFonts';
import 'react-toastify/dist/ReactToastify.css';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import CommonModals from 'components/shared/modals/CommonModals';
import AnchorTop from 'components/atoms/AnchorTop';
import { store } from '../redux/store';
// need update to new firebase version
// import PushNotificationLayout from '../hoks/notifications';
import { RECAPTCHA_SITE_KEY } from '../utils/constants';

const SiteFooter = dynamic(() => import('components/shared/Footer/SiteFooter'));

const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false },
);

/**
 *  Add page transition loader
 */
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const SHSite = ({ Component, pageProps }) => (
  <SSRProvider>
    <Provider store={store}>
      <GlobalStyle />
      <InitFonts />
      {/* <PushNotificationLayout> */}
      <ReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
        <MainSiteHead />
        <ToastContainer />
        <Header />
        <main>
          <Component {...pageProps} />
          <AnchorTop />
        </main>
        <SiteFooter />
        <CommonModals />
        <GoogleTagManager gtmId="GTM-PZ2XWLW4" />
      </ReCaptchaProvider>
      {/* </PushNotificationLayout> */}
    </Provider>
  </SSRProvider>
);
export default SHSite;
