import {configureStore} from '@reduxjs/toolkit';

//slice
import  latestmangaReducer  from './latestmangaSlice';
import chaptersReducer from './chaptersSlice';
import pagesReducer from './pageSlice';

export const store = configureStore({
  reducer: {
    latestmanga: latestmangaReducer,
    chapters: chaptersReducer,
    pages: pagesReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export default store;