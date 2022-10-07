const CHANGE_POST_INFO = "CHANGE_POST_INFO";

export const changePostInfo = (postInfo) => ( {type: CHANGE_POST_INFO, ...postInfo})


const initialState = {
    id: "",
    title: "",
    content: "",
    thumbnail: "",
  };
  
  function postInfoReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_POST_INFO:
            console.log(action.type);
            return {
                ...state,
                id: action.id,
                title: action.title,
                content: action.content,
                thumbnail: action.thumbnail,
            };
      default:
        return state;
    }
  }
  
  export default postInfoReducer;