/**
 * Description: Reducer of the user data
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    token: "",
    workingFor: "",
    selected_workingForId: null,
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                token: action.token,
                workingFor: action.workingFor,
                selected_workingForId: null
            };
        }
        case Actions.GET_USER_DATA:
        {
            return {
                token: action.token,
                workingFor: action.workingFor,
                selected_workingForId: action.selected_workingForId
            };
        }
        case Actions.UPDATE_USER_WORKINGFORID:
        {
            return {
                token: state.token,
                workingFor: state.workingFor,
                selected_workingForId: action.id
            };
        }
        default:
        {
            return state
        }
    }
};

export default user;