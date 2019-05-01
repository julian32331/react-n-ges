/**
 * Description: My ledger Check reducer
 * Date: 4/30/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    list        : []
};

const check = function (state = initialState, action) {
    let index;
    switch ( action.type ) {
        case Actions.GET_LEDGER_CHECK:
            return {
                loading     : true,
                error       : '',
                list        : []
            };
        case Actions.GET_LEDGER_CHECK_SUCCESS:
            return {
                ...state,
                loading     : false,
                list        : action.payload
            };
        case Actions.GET_LEDGER_CHECK_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };
            
        case Actions.LEDGER_CHECKIN_SUCCESS:
        case Actions.LEDGER_MANUAL_CHECKIN_SUCCESS:
            return {
                ...state,
                list: [action.payload].concat(state.list)
            };

        case Actions.LEDGER_CHECKIN_FAILED:
        case Actions.LEDGER_MANUAL_CHECKIN_FAILED:
        case Actions.LEDGER_CHECKOUT_FAILED:
        case Actions.LEDGER_UPDATE_CHECKINOUT_FAILED:
            return {
                ...state,
                error: action.payload
            };

        case Actions.LEDGER_UPDATE_CHECKINOUT_SUCCESS:
        case Actions.LEDGER_CHECKOUT_SUCCESS:
            index = state.list.findIndex((item) => {
                return item.personnelListId === action.payload.personnelListId;
            });
            state.list[index] = {
                ...state.list[index],
                ...action.payload
            };
            return {
                ...state,
                list: state.list.concat()
            };           

        default:
            return state;
    }
}

export default check;