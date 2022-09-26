// 액션 타입
const LOGIN = "LOGIN";
// const LOGOUT = "LOGOUT";

// 액션 함수
export const changeLogin = (status) => ( {type: LOGIN, })
// export const logout = () => ( {type: LOGOUT})

// 초기 상태
const initialState = {
    login: false
}

function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                status: action.status,
            }
        default:
            return state;
    }
}