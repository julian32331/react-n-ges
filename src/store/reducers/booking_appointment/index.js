/**
 * Description: Booking appointment Reducer.
 * Date: 4/3/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    isSalonOpen : true,
    data        : [],
    employees   : [],
};

const booking_appointment = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.APPOINTMENT_REQUEST:
            return {
                ...state,
                loading     : true,
                isSalonOpen : true,
                error       : '',
                data        : []
            };
        case Actions.APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading     : false,
                isSalonOpen : action.payload.isSalonOpen,
                data        : action.payload.bookingData,
                employees   : action.payload.hairdressers
            };
        case Actions.APPOINTMENT_FAILED:
        case Actions.BREAK_FAILED:
        case Actions.DELETE_EVENT_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.BREAK_SUCCESS:
            return {
                ...state,
                data        : state.data.concat(action.payload),
            };

            
        case Actions.DELETE_EVENT_SUCCESS:
            let index = state.data.findIndex((event) => {
                return event.id == action.payload;
            });
            state.data.splice(index, 1);
            return {
                ...state,
                data: state.data.concat()
            };
        default:
            return state
    }
};

export default booking_appointment;