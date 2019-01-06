/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    check_list: []
};

const checkInOut = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CHECKLIST_DATA:
        {
            return {
                check_list: action.data
            };
        }
        // case Actions.SET_SERVICE_DATA:
        // {
        //     return {
        //         check_list: [
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

export default checkInOut;