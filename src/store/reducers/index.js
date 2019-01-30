import {combineReducers} from 'redux';
import auth from "./auth.reducer";
import user from "./user.reducer";
import salonInfo from "./salonInfo.reducer";
import companyInfo from "./companyInfo.reducer";
import service from "./service.reducer";
import hours from "./hours.reducer";
import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";
import mySalons from "./mySalons.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        user,
        salonInfo,
        companyInfo,
        service,
        hours,
        checkInOut,
        employees,
        mySalons,
        ...asyncReducers
    });

export default createReducer;
