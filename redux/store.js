import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { wpGraphQl } from './services/wp-graphql';
import { appApi } from './services/project-api';
import attorneysReducer from './slices/attorneys.slice';
import sizesReducer from './slices/sizes.slice';
import modalsReducer from './slices/modals.slice';
import libraryReducer from './slices/library.slice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [wpGraphQl.reducerPath]: wpGraphQl.reducer,
    [appApi.reducerPath]: appApi.reducer,
    attorneys: attorneysReducer,
    sizes: sizesReducer,
    modals: modalsReducer,
    library: libraryReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wpGraphQl.middleware, appApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
