/**
 * Description: My Ledger Check actions
 * Date: 4/30/2019
 */

import * as Utils from 'utils/api';

export const GET_LEDGER_CHECK         = '[LEDGER] CHECK GET';
export const GET_LEDGER_CHECK_SUCCESS = '[LEDGER] CHECK GET SUCCESS';
export const GET_LEDGER_CHECK_FAILED  = '[LEDGER] CHECK GET FAILED';

export function getLedgerChecks(data) {
    const request = Utils.xapi().post('manager/checklist', data);

    return (dispatch) => {
        dispatch({
            type: GET_LEDGER_CHECK
        })
        request.then((response) =>
            dispatch({
                type    : GET_LEDGER_CHECK_SUCCESS,
                payload : response.data.data
            })
        ).catch((error) => {
            dispatch({
                type    : GET_LEDGER_CHECK_FAILED,
                payload : error
            })
        });
    }        
}

export const LEDGER_CHECKIN_SUCCESS = '[LEDGER] CHECKIN SUCCESS';
export const LEDGER_CHECKIN_FAILED  = '[LEDGER] CHECKIN FAILED';

export function checkIn(data) {
    const request = Utils.xapi().post('employee/checkin', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : LEDGER_CHECKIN_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : LEDGER_CHECKIN_FAILED,
                payload : error
            })
        });
    }       
}

export const LEDGER_MANUAL_CHECKIN_SUCCESS = '[LEDGER CHECK] MANUAL CHECKIN SUCCESS';
export const LEDGER_MANUAL_CHECKIN_FAILED  = '[LEDGER CHECK] MANUAL CHECKIN FAILED';

export function manualCheckIn(data) {
    const request = Utils.xapi().post('employee/manualcheckin', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : LEDGER_MANUAL_CHECKIN_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : LEDGER_MANUAL_CHECKIN_FAILED,
                payload : error
            })
        });
    }       
}

export const LEDGER_UPDATE_CHECKINOUT_SUCCESS = '[LEDGER] UPDATE CHECKINOUT SUCCESS';
export const LEDGER_UPDATE_CHECKINOUT_FAILED  = '[LEDGER] UPDATE CHECKINOUT FAILED';

export function updateCheckInOut(data) {
    const request = Utils.xapi().post('employee/editcheckinout', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : LEDGER_UPDATE_CHECKINOUT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : LEDGER_UPDATE_CHECKINOUT_FAILED,
                payload : error
            })
        });
    }
}

export const LEDGER_CHECKOUT_SUCCESS = '[LEDGER] CHECKOUT SUCCESS';
export const LEDGER_CHECKOUT_FAILED  = '[LEDGER] CHECKOUT FAILED';

export function checkOut(data) {
    const request = Utils.xapi().post('employee/checkout', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : LEDGER_CHECKOUT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : LEDGER_CHECKOUT_FAILED,
                payload : error
            })
        });
    }
}