import {combineReducers} from 'redux';

import booking from './booking';
import b2b_shop from './b2b_shop';


import auth from "./auth.reducer";
import user from "./user.reducer";
import salonInfo from "./salonInfo.reducer";
import companyInfo from "./companyInfo.reducer";
import service from "./service.reducer";
import hours from "./hours.reducer";
import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";
import mySalons from "./mySalons.reducer";
import profile from "./profile.reducer";
import admin from "./admin.reducer";
import b2bshop from "./b2bshop.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        booking,
        b2b_shop,

        auth,
        user,
        salonInfo,
        companyInfo,
        service,
        hours,
        checkInOut,
        employees,
        mySalons,
        profile,
        admin,
        b2bshop,
        ...asyncReducers
    });

export default createReducer;
