import {configureStore} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';


// 액션 타입
const LOGIN = "LOGIN";
const PAGE = "PAGE";
const POSTID = "POSTID";
const MODE = "MODE";

// 액션 함수
export const changeLogin = (info) => ( {type: LOGIN, ...info})
export const changePage = (page) => ( {type: PAGE, page})
export const changePostInfo = (postInfo) => ( {type: POSTID, ...postInfo})
// export const changeMode = (mode) => ( {type: MODE, mode})

// 초기 상태
const initialState = {
  userInfo: {
    status: "false",
    id: "",
    name: "",
  },
  page: "postList",
  postInfo: {
    id: "",
    title: "",
    content: "",
    thumbnail: "",
  },
  // mode: '',
};

// reducer
function login_reducer(state = initialState, action) {
  console.log("reducer!!");
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
      console.log(action.type);
      return {
        ...state,
        page: action.page,
      };
    case POSTID:
      console.log(action.type);
      return {
        ...state,
        postInfo: {
          id: action.id,
          title: action.title,
          content: action.content,
          thumbnail: action.thumbnail,
        }
      };
    // case MODE:
    //   console.log(action.type);
    //   return {
    //     ...state,
    //     mode: action.mode,
    //   };
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