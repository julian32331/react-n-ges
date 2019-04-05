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