/**
 * Description: My salon Info reducer
 * Date: 3/30/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    info    : null
};

const info = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_SALON_INFO:
            return {
                ...state,
                loading : true,
                error   : '',
                info    : null
            };
        case Actions.GET_SALON_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                info    : action.payload
            };
        case Actions.GET_SALON_INFO_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
        default:
            return state;
    }
}

export default info;