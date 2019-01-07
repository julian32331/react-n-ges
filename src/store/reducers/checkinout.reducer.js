/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    list: []
};

const checkInOut = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CHECKLIST:
        {
            return {
                list: action.list
            };
        }
        default:
        {
            return state
        }
    }
};

export default checkInOut;