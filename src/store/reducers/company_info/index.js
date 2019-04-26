/**
 * Description: Company Info reducer
 * Date: 4/26/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    info    : null
};

const company = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COMPANY_INFO:
            return {
                ...state,
                loading : true,
                error   : '',
                info    : null
            };
        case Actions.GET_COMPANY_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                info    : action.payload
            };
        case Actions.GET_COMPANY_INFO_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
            
        case Actions.UPDATE_COMPANY_INFO_SUCCESS:
            return {
                ...state,
                info: action.payload
            };
        case Actions.UPDATE_COMPANY_INFO_FAILED:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state
    }
};

export default company;