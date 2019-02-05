/**
 * Description: Reducer of the user data
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    token: "",
    workingFor: "",
    workingForId: null,
    isEmployee: "",
    avatar: "",
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                token: action.token,
                workingFor: action.workingFor,
                workingForId: null,
                isEmployee: true,
                avatar: "",
            };
        }
        case Actions.GET_USER_DATA:
        {
            return {
                token: action.token,
                workingFor: action.workingFor,
                workingForId: action.workingForId,
                isEmployee: action.isEmployee,
                avatar: action.avatar
            };
        }
        case Actions.UPDATE_USER_WORKINGFORID:
        {
            return {
                token: state.token,
                workingFor: state.workingFor,
                workingForId: action.workingForId,
                isEmployee: action.isEmployee,
                avatar: state.avatar
            };
        }
        case Actions.UPDATE_USER_AVATAR:
        {
            return {
                token: state.token,
                workingFor: state.workingFor,
                workingForId: state.workingForId,
                isEmployee: state.isEmployee,
                avatar: action.avatar
            };
        }
        default:
        {
            return state
        }
    }
};

export default user;