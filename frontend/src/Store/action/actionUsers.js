import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_SUCCESS,
    REGISTER_FACEBOOK_USER_ERROR,
    REGISTER_FACEBOOK_USER_REQUEST,
    REGISTER_FACEBOOK_USER_SUCCESS
} from "./actionType";

import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const registerFacebookUserSuccess = (user) => ({type: REGISTER_FACEBOOK_USER_SUCCESS, user});
export const registerFacebookUserError = error => ({type: REGISTER_FACEBOOK_USER_ERROR, error});
export const registerFacebookUserRequest = () => ({type: REGISTER_FACEBOOK_USER_REQUEST});


export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserError = (error) => ({type: LOGIN_USER_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserError = () => ({type: LOGOUT_USER_ERROR});

export const registerFacebookUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(registerFacebookUserRequest());
            const res = await axiosApi.post('/users/facebook', user);
            toast.success(res.data.message);
            dispatch(registerFacebookUserSuccess(res.data.user));
            dispatch(push('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerFacebookUserError(e.response.data))
            } else {
                dispatch(registerFacebookUserError(e))
            }
        }
    }
};

export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(loginUserRequest());
            const res = await axiosApi.post('/users/sessions', user);
            toast.success(res.data.message);
            dispatch(loginUserSuccess(res.data.user));
            dispatch(push('/'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserError(e.response.data))
            } else {
                dispatch(loginUserError(e))
            }
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            const res = await axiosApi.delete('/users/sessions', config);
            toast.success(res.data.message);
            dispatch(logoutUserSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(logoutUserError(e))
        }
    }
};