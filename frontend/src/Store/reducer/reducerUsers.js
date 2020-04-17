import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_SUCCESS,
    REGISTER_FACEBOOK_USER_ERROR,
    REGISTER_FACEBOOK_USER_REQUEST,
    REGISTER_FACEBOOK_USER_SUCCESS
} from "../action/actionType";

const initialState = {
    user: null,
    registerFbError: null,
    registerFbLoad: false,
    loginError: null,
    loginLoad: false,
    logoutUserError: null
};

const reducerUsers = (state = initialState, action)=>{
    switch (action.type) {
        case REGISTER_FACEBOOK_USER_SUCCESS:
            return {...state, user : action.user, registerFbError: null, registerFbLoad: false};
        case REGISTER_FACEBOOK_USER_REQUEST:
            return {...state, registerFbLoad: true};
        case REGISTER_FACEBOOK_USER_ERROR:
            return {...state, loginError: action.error, registerFbLoad: false};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null, loginLoad: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoad: true};
        case LOGIN_USER_ERROR:
            return {...state, loginLoad: false, loginError: action.error};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};
        case LOGOUT_USER_ERROR:
            return {...state, logoutUserError: null};
        default:
            return state
    }
};

export default reducerUsers;