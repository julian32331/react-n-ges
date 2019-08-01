import {combineReducers} from 'redux';
import { intlReducer } from 'react-intl-redux';

import booking from './booking';
import auth from './auth';
import dashboard from './dashboard';
import my_salon from './my_salon';
import booking_appointment from './booking_appointment';
import b2b_shop from './b2b_shop';
import company from './company_info';
import my_ledger from './my_ledger';
import profile from './profile';
import locales from './locales.reducer';
import social_marketing from './social_marketing';

import employees from "./employees.reducer";
import mySalons from "./mySalons.reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        intl: intlReducer,

        locales,
        booking,
        auth,
        dashboard,
        my_salon,
        booking_appointment,
        b2b_shop,        
        company,
        my_ledger,
        profile,
        social_marketing,
        
        employees,
        mySalons,
        ...asyncReducers
    });

export default createReducer;
