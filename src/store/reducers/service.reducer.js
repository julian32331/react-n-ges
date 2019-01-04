/**
 * Description: Reducer of the service
 * Date: 1/3/2019
 */

import * as Actions from '../actions';

const initialState = {
    data: []
};

const service = function (state = initialState, action) {
    console.log('action data: ', action)
    switch ( action.type )
    {
        case Actions.GET_SERVICE_DATA:
        {
            return {
                data: action.data
            };
        }
        case Actions.SET_SERVICE_DATA:
        {
            return {
                data: [
                    ...state.data,
                    action.data
                ]
            };
        }
        default:
        {
            return state
        }
    }
};

export default service;