/**
 * Description: Reducer of the info
 * Date: 1/12/2019
 */

import * as Actions from '../actions';

const initialState = {
    status: false,
    errorMsg: ""
};

const info = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD_INFO:
        {
            return {
                status: false,
                errorMsg: ""
            };
        }
        case Actions.ADD_INFO_SUCCESS:
        {
            return {
                ...initialState,
                status: true
            };
        }
        case Actions.ADD_INFO_SUCCESS:
        {
            return {
                status: false,
                errorMsg: action.errorMsg
            };
        }
        default:
        {
            return state
        }
    }
};

export default info;