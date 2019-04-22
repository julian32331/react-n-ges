import {combineReducers} from 'redux';

import booking from './booking';
import auth from './auth';
import my_salon from './my_salon';
import booking_appointment from './booking_appointment';
import b2b_shop from './b2b_shop';


// import auth from "./auth.reducer";
import user from "./user.reducer";
import companyInfo from "./companyInfo.reducer";
import hours from "./hours.reducer";
import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";
import mySalons from "./mySalons.reducer";
import profile from "./profile.reducer";
import b2bshop from "./b2bshop.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        booking,
        auth,
        my_salon,
        booking_appointment,
        b2b_shop,
        
        user,
        companyInfo,
        hours,
        checkInOut,
        employees,
        mySalons,
        profile,
        b2bshop,
        ...asyncReducers
    });

export default createReducer;
