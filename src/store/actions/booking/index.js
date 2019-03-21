/**
 * Description: Booking Layout Actions
 * Date: 3/20/2019
 */

import * as Utils from 'utils';

export const SERVICES_REQUEST   = '[BOOKING] SERVICES REQUEST';
export const SERVICES_SUCCESS   = '[BOOKING] SERVICES SUCCESS';
export const SERVICES_FAILED    = '[BOOKING] SERVICES FAILED';

export function getBookingServices(data) {
    const request = Utils.xapi().post('booking/services', data);

    return (dispatch) => {
        dispatch({
            type: SERVICES_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : SERVICES_SUCCESS,
                payload : response.data.services
            })
        ).catch((error) => {
            dispatch({
                type    : SERVICES_FAILED,
                payload : error
            })
        });
    }        
}

export const EMPLOYEES_REQUEST  = '[BOOKING] EMPLOYEES REQUEST';
export const EMPLOYEES_SUCCESS  = '[BOOKING] EMPLOYEES SUCCESS';
export const EMPLOYEES_FAILED   = '[BOOKING] EMPLOYEES FAILED';

export function getBookingEmployees(data) {
    const request = Utils.xapi().post('booking/hairdressers', data);

    return (dispatch) => {
        dispatch({
            type: EMPLOYEES_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : EMPLOYEES_SUCCESS,
                payload : response.data.Employees
            })
        ).catch((error) => {
            dispatch({
                type    : EMPLOYEES_FAILED,
                payload : error
            })
        });
    }
}

export const DAYSOFF_REQUEST    = '[BOOKING] DAYSOFF REQUEST';
export const DAYSOFF_SUCCESS    = '[BOOKING] DAYSOFF SUCCESS';
export const DAYSOFF_FAILED     = '[BOOKING] DAYSOFF FAILED';

export function getBookingDaysOff(data) {
    const request = Utils.xapi().post('booking/daysoff', data);

    return (dispatch) => {
        dispatch({
            type: DAYSOFF_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : DAYSOFF_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : DAYSOFF_FAILED,
                payload : error
            })
        });
    }
}

export const TIMESLOTS_REQUEST  = '[BOOKING] TIMESLOTS REQUEST';
export const TIMESLOTS_SUCCESS  = '[BOOKING] TIMESLOTS SUCCESS';
export const TIMESLOTS_FAILED   = '[BOOKING] TIMESLOTS FAILED';

export function getBookingTimeslots(data) {
    const request = Utils.xapi().post('booking/timeslots', data);

    return (dispatch) => {
        dispatch({
            type: TIMESLOTS_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : TIMESLOTS_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : TIMESLOTS_FAILED,
                payload : error
            })
        });
    }
}