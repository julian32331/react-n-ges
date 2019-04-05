/**
 * Description: Booking appointment Actions.
 * Date: 4/3/2019
 */

import * as Utils from 'utils';

export const APPOINTMENT_REQUEST = '[BOOKING APPOINTMENT] REQUEST';
export const APPOINTMENT_SUCCESS = '[BOOKING APPOINTMENT] SUCCESS';
export const APPOINTMENT_FAILED  = '[BOOKING APPOINTMENT] FAILED';

export function getAppointment(data) {
    const request = Utils.xapi().post('booking/dashboard/timelineday', data);

    return (dispatch) => {
        dispatch({
            type: APPOINTMENT_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : APPOINTMENT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : APPOINTMENT_FAILED,
                payload : error
            })
        });
    }
}

export const BREAK_TIME_REQUEST = '[BOOKING APPOINTMENT] BREAK TIME REQUEST';
export const BREAK_TIME_SUCCESS = '[BOOKING APPOINTMENT] BREAK TIME SUCCESS';
export const BREAK_TIME_FAILED  = '[BOOKING APPOINTMENT] BREAK TIME FAILED';

export function setBreakTime(data) {
    const request = Utils.xapi().post('booking/dashboard/break', data);

    return (dispatch) => {
        dispatch({
            type: BREAK_TIME_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : BREAK_TIME_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : BREAK_TIME_FAILED,
                payload : error
            })
        });
    }
}