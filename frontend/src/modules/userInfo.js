const CHANGE_USER_INFO = "CHANGE_USER_INFO";

export const changeUserInfo = (info) => ( {type: CHANGE_USER_INFO, ...info});

const initialState = {
  status: "false",
  id: "",
  name: "",
  auth: "",
};

function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return {
        ...state,
        status: action.status,
        id: action.id,
        name: action.name,
        auth: action.auth,
      };
    default:
      return state;
  }
}

export default userInfoReducer;