import {combineReducers} from 'redux';

import booking from './booking';
import auth from './auth';
import my_salon from './my_salon';
import booking_appointment from './booking_appointment';
import b2b_shop from './b2b_shop';
import company from './company_info';
import my_ledger from './my_ledger';

// import checkInOut from "./checkinout.reducer";
import employees from "./employees.reducer";
import mySalons from "./mySalons.reducer";
import profile from "./profile.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        booking,
        auth,
        my_salon,
        booking_appointment,
        b2b_shop,        
        company,
        my_ledger,
        
        // checkInOut,
        employees,
        mySalons,
        profile,
        ...asyncReducers
    });

export default createReducer;
