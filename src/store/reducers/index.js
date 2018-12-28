import {combineReducers} from 'redux';
import login from "./login.reducer";
import user from "./user.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        login,
        user,
        ...asyncReducers
    });

export default createReducer;
