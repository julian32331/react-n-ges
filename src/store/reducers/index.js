import {combineReducers} from 'redux';
import login from "./login.reducer";
import user from "./user.reducer";
import service from "./service.reducer";
import hour from "./hour.reducer";
import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        login,
        user,
        service,
        hour,
        checkInOut,
        employees,
        ...asyncReducers
    });

export default createReducer;
