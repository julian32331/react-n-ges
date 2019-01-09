/**
 * Description: Reducer of the login
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    status: false,
    errorMsg: "",
    companyData: null
};

const auth = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN:
        {
            return {
                ...initialState,
                status: false
            };
        }
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                status: true
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                status: false,
                errorMsg: action.payload
            };
        }
        case Actions.GET_COMPANY_DATA:
        {
            return {
                ...initialState,
                errorMsg: "",
                companyData: null
            };
        }
        case Actions.GET_COMPANY_DATA_SUCCESS:
        {
            return {
                ...initialState,
                companyData: action.data
            };
        }
        case Actions.GET_COMPANY_DATA_ERROR:
        {
            return {
                ...initialState,
                errorMsg: action.errorMsg
            };
        }
        case Actions.REGISTER:
        {
            return {
                ...initialState,
                errorMsg: "",
                companyData: action.data
            };
        }
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                status: true,
                companyData: action.data
            };
        }
        default:
        {
            return state
        }
    }
};

export default auth;