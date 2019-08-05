/**
 * Description: Dashboard reducer
 * Date: 8/1/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    campaigns: []
};

const dashboard = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_DASHBOARD_CAMPAIGNS:
            return {
                ...state,
                loading : true,
                error   : ''
            };
        case Actions.GET_DASHBOARD_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                loading : false,
                campaigns: action.payload
            };
        case Actions.GET_DASHBOARD_CAMPAIGNS_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
        default:
            return state;
    }
}

export default dashboard;