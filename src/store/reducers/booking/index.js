/**
 * Description: Booking Layout Reducers
 * Date: 3/20/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading: false,
    error: '',
    services: [],
    employees: [],
};

const booking = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                services: []
            };
        case Actions.SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload
            };
        case Actions.SERVICES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case Actions.EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                employees: []
            };
        case Actions.EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: action.payload
            };
        case Actions.EMPLOYEES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default booking;