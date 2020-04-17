import {
    ADD_NEW_COCKTAIL_ERROR,
    ADD_NEW_COCKTAIL_REQUEST,
    ADD_NEW_COCKTAIL_SUCCESS,
    CONTROL_PUBLISH_ERROR,
    CONTROL_PUBLISH_SUCCESS, DELETE_COCKTAIL_ERROR, DELETE_COCKTAIL_SUCCESS,
    GET_ALL_COCKTAILS_ERROR,
    GET_ALL_COCKTAILS_REQUEST,
    GET_ALL_COCKTAILS_SUCCESS,
    GET_COCKTAILS_USER_ERROR,
    GET_COCKTAILS_USER_REQUEST,
    GET_COCKTAILS_USER_SUCCESS
} from "./actionType";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from 'connected-react-router';

export const addNewCocktailSuccess = () => ({type: ADD_NEW_COCKTAIL_SUCCESS});
export const addNewCocktailRequest = () => ({type: ADD_NEW_COCKTAIL_REQUEST});
export const addNewCocktailError = error => ({type: ADD_NEW_COCKTAIL_ERROR, error});

export const getCocktailsUserSuccess = (cocktailsUser) => ({type: GET_COCKTAILS_USER_SUCCESS, cocktailsUser});
export const getCocktailsUserRequest = () => ({type: GET_COCKTAILS_USER_REQUEST});
export const getCocktailsUserError = error => ({type: GET_COCKTAILS_USER_ERROR, error});

export const getAllCocktailSuccess = (cocktails) => ({type: GET_ALL_COCKTAILS_SUCCESS, cocktails});
export const getAllCocktailRequest = () => ({type: GET_ALL_COCKTAILS_REQUEST});
export const getAllCocktailError = error => ({type: GET_ALL_COCKTAILS_ERROR, error});

export const controlPublishError = error => ({type: CONTROL_PUBLISH_ERROR, error});
export const controlPublishSuccess = () => ({type: CONTROL_PUBLISH_SUCCESS});

export const deleteCocktailSuccess = () => ({type: DELETE_COCKTAIL_SUCCESS});
export const deleteCocktailError = error => ({type: DELETE_COCKTAIL_ERROR, error});

export const addNewCocktail = cocktail => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            dispatch(addNewCocktailRequest());
            const res = await axiosApi.post('/cocktails', cocktail, config);
            toast.success(res.data.message);
            dispatch(addNewCocktailSuccess());
            dispatch(push('/cocktails'))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addNewCocktailError(e.response.data))
            } else {
                dispatch(addNewCocktailError(e))
            }
        }
    }
};

export const getAllCocktails = () => {
    return async (dispatch) => {
        try {
            dispatch(getAllCocktailRequest());
            const res = await axiosApi.get('/cocktails');
            dispatch(getAllCocktailSuccess(res.data))
        } catch (e) {
            dispatch(getAllCocktailError(e))
        }
    }
};

export const getCocktailsUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            dispatch(getCocktailsUserRequest());
            const res = await axiosApi.get('/cocktails/user', config);
            dispatch(getCocktailsUserSuccess(res.data))
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(getCocktailsUserError(e.response.data))
            } else {
                dispatch(getCocktailsUserError(e))
            }
        }
    }
};

export const publishCocktail = (id) => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.post('/cocktails/publish', {id});
            toast.success(res.data.message);
            dispatch(getAllCocktails());
            dispatch(controlPublishSuccess())
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(controlPublishError(e.response.data))
            } else {
                dispatch(controlPublishError(e.response.data))
            }
        }
    }
};

export const deleteCocktailId = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            const res = await axiosApi.delete('/cocktails/remove/' + id, config);
            toast.success(res.data.message);
            dispatch(deleteCocktailSuccess());
            dispatch(getAllCocktails())
        } catch (e) {
            dispatch(deleteCocktailError(e))
        }
    }
};
