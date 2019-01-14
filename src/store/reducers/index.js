import {combineReducers} from 'redux';
import auth from "./auth.reducer";
import user from "./user.reducer";
import info from "./info.reducer";
import service from "./service.reducer";
import hours from "./hours.reducer";
import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        user,
        info,
        service,
        hours,
        checkInOut,
        employees,
        ...asyncReducers
    });

export default createReducer;
