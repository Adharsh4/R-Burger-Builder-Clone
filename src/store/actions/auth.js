import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const authLogout = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000) // setTimeout takes milliseconds to converting seconds to milliseconds
    }
}

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true // this argument can be found if we google as firebase rest auth and inside you 
            //will find the below link for post request and this paramenete that need for the body for the post request
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvRTapGfrmUdjs53q-QSXC_8BdPZveCPs";
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvRTapGfrmUdjs53q-QSXC_8BdPZveCPs"
        }
        axios.post(url, authData)
            .then((response) => {
                // console.log(response)
                // Use this statement to know in what name idtoken and localId(userId) is present in response.data
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch((error) => {
                dispatch(authFail(error.response.data.error)) // if we pass only error and display that we
                //  get status code like "error 404 not found" but since we use axios here if we do like 
                // error.response.data.error we get error like "EMAIL_EXISTS" ,"WEAK PASSWORD-min 6 in length" and etc
            })
    }
}


export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}