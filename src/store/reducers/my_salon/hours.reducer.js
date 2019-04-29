/**
 * Description: My salon Hours reducer
 * Date: 4/29/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    openingHours: [],
    specialDays : []
};

const hours = function (state = initialState, action) {
    let index;
    switch ( action.type ) {
        case Actions.GET_SALON_HOURS:
            return {
                ...state,
                loading     : true,
                error       : '',
                openingHours: [],                
                specialDays : []
            };
        case Actions.GET_SALON_HOURS_SUCCESS:
            return {
                ...state,
                loading     : false,
                openingHours: action.payload.openingHours,
                specialDays : action.payload.specialDays
            };
        case Actions.GET_SALON_HOURS_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };

        case Actions.UPDATE_SALON_HOURS_SUCCESS:
            return {
                ...state,
                openingHours: action.payload
            };

        case Actions.UPDATE_SALON_HOURS_FAILED:
        case Actions.ADD_SALON_SPACIAL_DAY_FAILED:
        case Actions.UPDATE_SALON_SPACIAL_DAY_FAILED:
        case Actions.DELETE_SALON_SPACIAL_DAY_FAILED:
            return {
                ...state,
                error: action.payload
            };
            
        case Actions.ADD_SALON_SPACIAL_DAY_SUCCESS:
            return {
                ...state,
                specialDays: state.specialDays.concat(action.payload)
            };

        case Actions.UPDATE_SALON_SPACIAL_DAY_SUCCESS:
            index = state.specialDays.findIndex((day) => {
                return day.id === action.payload.id;
            });
            state.specialDays[index] = action.payload;
            return {
                ...state,
                specialDays: state.specialDays.concat()
            };

        case Actions.DELETE_SALON_SPACIAL_DAY_SUCCESS:
            index = state.specialDays.findIndex((day) => {
                return day.id === action.payload;
            });
            state.specialDays.splice(index, 1);
            return {
                ...state,
                specialDays: state.specialDays.concat()
            };            

        default:
            return state;
    }
}

export default hours;