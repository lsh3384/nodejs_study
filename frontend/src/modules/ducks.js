import {configureStore} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';


// 액션 타입
const LOGIN = "LOGIN";
const PAGE = "PAGE";

// 액션 함수
export const changeLogin = (info) => ( {type: LOGIN, ...info})
export const changePage = (page) => ( {type: PAGE, page})

// 초기 상태
const initialState = {
  userInfo: {
    status: "false",
    id: "",
    name: "",
  },
  page: 'postList'
};

// reducer
function login_reducer(state = initialState, action) {
    console.log('reducer!!')
    switch (action.type) {
        case LOGIN:
            return {
              ...state,
              userInfo: {
                status: action.status,
                id: action.id,
                name: action.name,
              },
            };
        case PAGE:
            console.log(action.type)
            return {
                ...state,
                page: action.page,
            }
        default:
            return state;
    }
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, login_reducer)

// store
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;