import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import Header from 'components/shared/Header/Header';
import MainSiteHead from 'components/shared/head/MainSiteHead';
import { Provider } from 'react-redux';

/* *
 *
 * 3rd Party Resources
 *
 * */
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* *
 * Custom Style Sheets and redux
 * */
import { GlobalStyle } from 'styles/global_styles/Global.styles';
import InitFonts from 'styles/global_styles/InitFonts';
import CommonModals from 'components/shared/CommonModals';
import { ToastProvider } from 'context/ToastContext';
import AnchorTop from 'components/atoms/AnchorTop';
import { GoogleTagManager } from '@next/third-parties/google';
import { store } from '../redux/store';

const SiteFooter = dynamic(() => import('components/shared/Footer/SiteFooter'));

/**
 *  Add page transition loader
 */
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const SHSite = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ToastProvider>
      <GlobalStyle />
      <InitFonts />
      <MainSiteHead />
      <Header />
      <main>
        <Component {...pageProps} />
        <AnchorTop />
      </main>
      <SiteFooter />
      <CommonModals />
      <GoogleTagManager gtmId="GTM-PZ2XWLW4" />
    </ToastProvider>
  </Provider>
);
export default SHSite;
