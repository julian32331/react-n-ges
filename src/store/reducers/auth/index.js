/**
 * Description: Auth reducer
 * Date: 4/19/2019
 */

import *as Actions from './../../actions';

const initialState = {
    token         : null,
    workingFor    : null,
    workingForId  : null,
    isEmployee    : null,
    avatar        : null,
    username      : null,
    hairdresserId : null
}

const auth = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.SET_USER:
            return {
                ...state,
                token       : action.token,
                workingFor  : action.workingFor,
                username    : action.username,
                avatar      : action.avatar
            };
        case Actions.GET_USER:
            return {
                token           : action.token,
                workingFor      : action.workingFor,
                workingForId    : action.workingForId,
                isEmployee      : action.isEmployee,
                avatar          : action.avatar,
                username        : action.username,
                hairdresserId   : action.hairdresserId
            };
        case Actions.UPDATE_USER:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};

export default auth;