/**
 * Description: Booking Layout Reducers
 * Date: 3/20/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    services    : [],
    employees   : [],
    daysOff     : null,
    timeSlots   : []
};

const booking = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.SERVICES_REQUEST:
            return {
                ...state,
                loading     : true,
                error       : '',
                services    : []
            };
        case Actions.SERVICES_SUCCESS:
            return {
                ...state,
                loading     : false,
                services    : action.payload
            };
        case Actions.SERVICES_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.EMPLOYEES_REQUEST:
            return {
                ...state,
                loading     : true,
                error       : '',
                employees   : []
            };
        case Actions.EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading     : false,
                employees   : action.payload
            };
        case Actions.EMPLOYEES_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.DAYSOFF_REQUEST:
            return {
                ...state,
                loading     : true,
                error       : '',
                daysOff     : null,
                timeSlots   : []
            };
        case Actions.DAYSOFF_SUCCESS:
            return {
                ...state,
                loading     : false,
                daysOff     : action.payload
            };
        case Actions.DAYSOFF_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.TIMESLOTS_REQUEST:
            return {
                ...state,
                loading     : false,
                error       : '',
                timeSlots   : []
            };
        case Actions.TIMESLOTS_SUCCESS:
            return {
                ...state,
                loading     : false,
                timeSlots   : action.payload
            };
        case Actions.TIMESLOTS_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };
        default:
            return state;
    }
};

export default booking;