import {combineReducers} from 'redux';
import login from "./login.reducer";
import user from "./user.reducer";
import service from "./service.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        login,
        user,
        service,
        ...asyncReducers
    });

export default createReducer;
