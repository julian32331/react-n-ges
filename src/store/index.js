/**
 * Description: Store
 * Date: 4/25/2019
 */

import * as reduxModule from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createReducer from 'store/reducers';
import thunk from 'redux-thunk';

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const initialState = {
    intl: {
        defaultLocale: 'sv',
        locale: 'sv',
    }
}

const store = createStore(createReducer(), initialState, enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
    if ( store.asyncReducers[key] )
    {
        return;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};

export default store;
