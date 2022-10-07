import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import pageReducer from './page';
import userInfoReducer from './userInfo';
import postInfoReducer from './postInfo';

const rootReducer = combineReducers({
  page: pageReducer,
  userInfo: userInfoReducer,
  postInfo: postInfoReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["userInfoReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// store
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;