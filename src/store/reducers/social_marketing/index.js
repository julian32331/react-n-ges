/**
 * Description: Social marketing reducer
 * Date: 7/22/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    data    : []
};

const social_marketing = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_SOCIAL_DATA:
            return {
                ...state,
                loading : true,
                error   : '',
                data    : []
            };
        case Actions.GET_SOCIAL_DATA_SUCCESS:
            return {
                ...state,
                loading : false,
                data    : action.payload
            };
        case Actions.GET_SOCIAL_DATA_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
        default:
            return state;
    }
}

export default social_marketing;