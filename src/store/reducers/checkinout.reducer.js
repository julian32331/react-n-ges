/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    list: [],
    errorMsg: "",
};

const checkInOut = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CHECKLIST:
        {
            return {
                list: action.list,
                errorMsg: state.errorMsg
            };
        }        
        case Actions.UPDATE_CHECKLIST:
        case Actions.ADD_CHECKLIST:
        {
            return {
                list: state.list,
                errorMsg: ""
            };
        }  
        case Actions.ADD_CHECKLIST_ERROR:
        {
            return {
                list: state.list,
                errorMsg: action.errorMsg
            };
        }
        default:
        {
            return state
        }
    }
};

export default checkInOut;