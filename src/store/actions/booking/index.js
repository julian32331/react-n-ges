/**
 * Description: Booking Layout Actions
 * Date: 3/20/2019
 */
import * as Utils from 'utils';

export const SERVICES_REQUEST = '[BOOKING] SERVICES REQUEST';
export const SERVICES_SUCCESS = '[BOOKING] SERVICES SUCCESS';
export const SERVICES_FAILED = '[BOOKING] SERVICES FAILED';

export function getBookingServices(data) {
    const request = Utils.xapi().post('booking/services', data);

    return (dispatch) => {
        dispatch({
            type: SERVICES_REQUEST
        })
        request.then((response) =>
            dispatch({
                type   : SERVICES_SUCCESS,
                payload: response.data.services
            })
        ).catch((error) => {
            dispatch({
                type   : SERVICES_FAILED,
                payload: error
            })
        });
    }        
}

export const EMPLOYEES_REQUEST = '[BOOKING] EMPLOYEES REQUEST';
export const EMPLOYEES_SUCCESS = '[BOOKING] EMPLOYEES SUCCESS';
export const EMPLOYEES_FAILED = '[BOOKING] EMPLOYEES FAILED';

export function getBookingEmployees(data) {
    const request = Utils.xapi().post('booking/hairdressers', data);

    return (dispatch) => {
        dispatch({
            type: EMPLOYEES_REQUEST
        })
        request.then((response) =>
            dispatch({
                type   : EMPLOYEES_SUCCESS,
                payload: response.data.Employees
            })
        ).catch((error) => {
            dispatch({
                type   : EMPLOYEES_FAILED,
                payload: error
            })
        });
    }
}