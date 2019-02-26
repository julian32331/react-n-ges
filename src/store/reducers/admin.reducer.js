/**
 * Description: Reducer of the login
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    status: null,
    errorMsg: "",
    bookingData: [],
    hairdressers: []
};

const admin = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.INIT_ADMIN:
        {
            return {
                ...state,
                status: null,
                errorMsg: ""
            };
        }
        case Actions.GET_BOOKINGDATA_SUCCESS:
        {
            return {
                status: "Ok",
                errorMsg: "",
                bookingData: action.bookingData,
                hairdressers: action.hairdressers
            };
        }
        case Actions.GET_BOOKINGDATA_FAILED:
        {
            return {
                ...state,
                status: "Ok",
                errorMsg: "",
            };
        }
        default:
        {
            return state
        }
    }
};

export default admin;