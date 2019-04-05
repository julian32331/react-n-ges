/**
 * Description: Booking appointment Reducer.
 * Date: 4/3/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    data        : [],
    employees   : [],
};

const booking_appointment = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.APPOINTMENT_REQUEST:
            return {
                ...state,
                loading     : true,
                error       : '',
            };
        case Actions.APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading     : false,
                data        : action.payload.bookingData,
                employees   : action.payload.hairdressers
            };
        case Actions.APPOINTMENT_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };
        default:
            return state
    }
};

export default booking_appointment;