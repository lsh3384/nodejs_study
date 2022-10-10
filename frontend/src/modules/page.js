const PAGE = "PAGE";

export const changePage = (page) => ( {type: PAGE, page});

// 초기 상태
const initialState = {
  page: 'PostList',
};

// reducer
function pageReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE:
      console.log(action.type);
      console.log(action);
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}

export default pageReducer;
