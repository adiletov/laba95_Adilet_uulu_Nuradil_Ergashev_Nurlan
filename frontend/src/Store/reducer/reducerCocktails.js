import {
    ADD_NEW_COCKTAIL_ERROR,
    ADD_NEW_COCKTAIL_REQUEST,
    ADD_NEW_COCKTAIL_SUCCESS,
    CONTROL_PUBLISH_ERROR,
    CONTROL_PUBLISH_SUCCESS,
    DELETE_COCKTAIL_ERROR,
    DELETE_COCKTAIL_SUCCESS,
    GET_ALL_COCKTAILS_ERROR,
    GET_ALL_COCKTAILS_REQUEST,
    GET_ALL_COCKTAILS_SUCCESS,
    GET_COCKTAILS_USER_ERROR,
    GET_COCKTAILS_USER_REQUEST,
    GET_COCKTAILS_USER_SUCCESS
} from "../action/actionType";

const initialState = {
    cocktails: [],
    getAllCocktailError: null,
    getAllCocktailLoad: false,
    getCocktailsUserError: null,
    getCocktailsUserLoad: false,
    addCocktailError: null,
    addCocktailLoad: false,
    controlError: null,
    deleteError: null,
};

const reducerCocktails = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_COCKTAIL_SUCCESS:
            return {...state, addCocktailError: null, addCocktailLoad: false};
        case ADD_NEW_COCKTAIL_ERROR:
            return {...state, addCocktailError: action.error, addCocktailLoad: false};
        case ADD_NEW_COCKTAIL_REQUEST:
            return {...state, addCocktailLoad: true};
        case GET_COCKTAILS_USER_SUCCESS:
            return {...state, cocktails: action.cocktailsUser, getCocktailsUserError: null, getCocktailsUserLoad: false };
        case GET_COCKTAILS_USER_ERROR:
            return {...state, getCocktailsUserError: action.error, getCocktailsUserLoad: false};
        case GET_COCKTAILS_USER_REQUEST:
            return {...state, getCocktailsUserLoad: true};
        case GET_ALL_COCKTAILS_SUCCESS:
            return {...state, cocktails: action.cocktails, getAllCocktailLoad: false, getAllCocktailError: null};
        case GET_ALL_COCKTAILS_ERROR:
            return {...state, getAllCocktailError: action.error, getAllCocktailLoad: false};
        case GET_ALL_COCKTAILS_REQUEST:
            return {...state, getAllCocktailLoad: true};
        case CONTROL_PUBLISH_ERROR:
            return {...state, controlError: action.error};
        case CONTROL_PUBLISH_SUCCESS:
            return {...state, controlError: null};
        case DELETE_COCKTAIL_ERROR:
            return {...state, deleteError: action.error};
        case DELETE_COCKTAIL_SUCCESS:
            return {...state, deleteError: null};
        default:
            return state;
    }
};

export default reducerCocktails;