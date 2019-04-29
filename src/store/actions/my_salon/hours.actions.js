/**
 * Description: My salon Hours Actions
 * Date: 4/29/2019
 */

import * as Utils from 'utils/api';

export const GET_SALON_HOURS         = '[SALON HOURS] GET';
export const GET_SALON_HOURS_SUCCESS = '[SALON HOURS] GET SUCCESS';
export const GET_SALON_HOURS_FAILED  = '[SALON HOURS] GET FAILED';

export function getSalonHours(data) {
    const request = Utils.xapi().post('manager/openinghours', data);

    return (dispatch) => {
        dispatch({
            type: GET_SALON_HOURS
        })
        request.then((response) =>
            dispatch({
                type    : GET_SALON_HOURS_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : GET_SALON_HOURS_FAILED,
                payload : error
            })
        });
    }        
}

export const UPDATE_SALON_HOURS_SUCCESS = '[SALON HOURS] UPDATE SUCCESS';
export const UPDATE_SALON_HOURS_FAILED  = '[SALON HOURS] UPDATE FAILED';

export function updateSalonHours(data) {
    const request = Utils.xapi().post('manager/openinghours/update', data);

    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : UPDATE_SALON_HOURS_SUCCESS,
                payload : data.openingHoursData
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_SALON_HOURS_FAILED,
                payload : error
            })
        });
    }        
}

export const ADD_SALON_SPACIAL_DAY_SUCCESS = '[SALON SPACIAL DAY] ADD SUCCESS';
export const ADD_SALON_SPACIAL_DAY_FAILED  = '[SALON SPACIAL DAY] ADD FAILED';

export function addSalonSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/add', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : ADD_SALON_SPACIAL_DAY_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : ADD_SALON_SPACIAL_DAY_FAILED,
                payload : error
            })
        });
    }       
}

export const UPDATE_SALON_SPACIAL_DAY_SUCCESS = '[SALON SPACIAL DAY] UPDATE SUCCESS';
export const UPDATE_SALON_SPACIAL_DAY_FAILED  = '[SALON SPACIAL DAY] UPDATE FAILED';

export function updateSalonSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/update', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : UPDATE_SALON_SPACIAL_DAY_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_SALON_SPACIAL_DAY_FAILED,
                payload : error
            })
        });
    }
}

export const DELETE_SALON_SPACIAL_DAY_SUCCESS = '[SALON SPACIAL DAY] DELETE SUCCESS';
export const DELETE_SALON_SPACIAL_DAY_FAILED  = '[SALON SPACIAL DAY] DELETE FAILED';

export function deleteSalonSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/delete', data);
    
    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : DELETE_SALON_SPACIAL_DAY_SUCCESS,
                payload : data.specialDayId
            })
        ).catch((error) => {
            dispatch({
                type    : DELETE_SALON_SPACIAL_DAY_FAILED,
                payload : error
            })
        });
    }
}