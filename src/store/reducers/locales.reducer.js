/**
 * Description: Reducer of the dashboard
 * Date: 6/11/2019
 */

import * as Actions from '../actions';

const initialState = {
    locales: null
};

const locales = function (state = initialState, action) {    
    switch ( action.type )
    {
        case Actions.SET_LOCALS:
        {
            return {
                locales: action.locales
            };
        }
        default:
        {
            return state
        }
    }
}

export default locales;