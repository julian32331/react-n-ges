/**
 * Description: My salon Info reducer
 * Date: 3/30/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    services: []
};

const services = function (state = initialState, action) {
    let index;
    switch ( action.type ) {
        case Actions.GET_SALON_SERVICE:
            return {
                ...state,
                loading : true,
                error   : '',
                services: []
            };
        case Actions.GET_SALON_SERVICE_SUCCESS:
            return {
                ...state,
                loading : false,
                services: action.payload
            };
        case Actions.GET_SALON_SERVICE_FAILED:
        case Actions.ADD_SALON_SERVICE_FAILED:
        case Actions.UPDATE_SALON_SERVICE_FAILED:
        case Actions.DELETE_SALON_SERVICE_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
            
        case Actions.ADD_SALON_SERVICE_SUCCESS:
            return {
                ...state,
                services: state.services.concat(action.payload),
            };

        case Actions.UPDATE_SALON_SERVICE_SUCCESS:
            index = state.services.findIndex((service) => {
                return service.id === action.payload.id;
            });
            state.services.splice(index, 1);
            return {
                ...state,
                services: state.services.concat(action.payload)
            };

        case Actions.DELETE_SALON_SERVICE_SUCCESS:
            index = state.services.findIndex((service) => {
                return service.id === action.payload;
            });
            state.services.splice(index, 1);
            return {
                ...state,
                services: state.services.concat()
            };
        default:
            return state;
    }
}

export default services;