/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    list: []
};

const employees = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EMPLOYEES_DATA:
        {
            return {
                list: action.data
            };
        }
        // case Actions.SET_SERVICE_DATA:
        // {
        //     return {
        //         list: [
        //             ...state.data,
        //             action.data
        //         ]
        //     };
        // }
        default:
        {
            return state
        }
    }
};

export default employees;