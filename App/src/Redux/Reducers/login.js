import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from '../Constant'

const initialState = {
    loginResult: {},
    loading: false
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loginResult:action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                loginResult:action.payload
            };
        default:
            return state;
    }
}