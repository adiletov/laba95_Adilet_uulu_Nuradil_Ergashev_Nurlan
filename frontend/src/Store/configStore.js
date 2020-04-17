import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import reducerUsers from "./reducer/reducerUsers";
import {loadFromLocalStorage, saveToLocalStorage} from "./configLocalStorage";
import reducerCocktails from "./reducer/reducerCocktails";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    router: connectRouter(history),
    users: reducerUsers,
    cocktails: reducerCocktails
});

const middleware = [
    thunk,
    routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate,  enhancers);
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});
export default store;