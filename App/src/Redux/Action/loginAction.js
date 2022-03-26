import axios from 'axios';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from '../Constant'

const loginRequest = {
    type: LOGIN_REQUEST
};

export function login(requestPayload) {
    return (dispatch) => {
        dispatch(loginRequest)
        axios.post('http://localhost:4000/login', { ...requestPayload })
            .then(res => {
                if(res.status === 200){
                    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
                    localStorage.setItem("login", JSON.stringify(res.data))
                }
            })
            .catch(error => {
                dispatch({ type: LOGIN_ERROR, payload: error })
                console.log(error)
            })
    }
}