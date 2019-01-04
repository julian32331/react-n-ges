/**
 * Description: Reducer of the login
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    status: false,
    errorMsg: ""
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                status: true
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                status: false,
                errorMsg  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;