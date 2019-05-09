/**
 * Description: Reducer of the profile
 * Date: 1/30/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    data    : null,
    error   : ""
};

const profile = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_PROFILE_DATA:
            return {
                loading : true,
                data    : null,
                error   : ""
            };
        case Actions.GET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                loading : false,
                data    : action.payload
            };
        case Actions.GET_PROFILE_DATA_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };

        case Actions.UPDATE_PROFIEL_DATA:
            return {
                data: state.data
            };
        default:
            return state
    }
};

export default profile;