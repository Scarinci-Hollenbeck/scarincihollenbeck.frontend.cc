import localforage from 'localforage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import fetch from 'node-fetch';
import { firebaseConfig } from './constants';

// enables messaging
const firebaseCloudMessaging = {
  tokenInlocalforage: async () => localforage.getItem('fcm_token'),

  async init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      // await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
      //   scope: '/firebase-cloud-messaging-push-scope',
      // });
      // await navigator.serviceWorker.ready;
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = firebase.messaging();
          const tokenInLocalForage = await this.tokenInlocalforage();
          const status = await Notification.requestPermission();

          if (status && status === 'granted') {
            const token = await messaging.getToken({
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            if (token && tokenInLocalForage !== token) {
              await localforage.setItem('fcm_token', token);
              // eslint-disable-next-line no-console
              console.info('new token', token);

              await fetch(`/api/fcm?token=${token}`, {
                method: 'GET',
              });

              return token;
            }
            // eslint-disable-next-line no-console
            console.info('cached token', token);
            return tokenInLocalForage;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};

export { firebaseCloudMessaging };