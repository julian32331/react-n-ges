/**
 * Description: My salon Service Actions
 * Date: 4/8/2019
 */

import * as Utils from 'utils';

export const GET_SALON_SERVICE         = '[SALON SERVICE] GET';
export const GET_SALON_SERVICE_SUCCESS = '[SALON SERVICE] GET SUCCESS';
export const GET_SALON_SERVICE_FAILED  = '[SALON SERVICE] GET FAILED';

export function getSalonServices(data) {
    const request = Utils.xapi().post('manager/services', data);

    return (dispatch) => {
        dispatch({
            type: GET_SALON_SERVICE
        })
        request.then((response) =>
            dispatch({
                type    : GET_SALON_SERVICE_SUCCESS,
                payload : response.data.services
            })
        ).catch((error) => {
            dispatch({
                type    : GET_SALON_SERVICE_FAILED,
                payload : error
            })
        });
    }        
}

export const ADD_SALON_SERVICE_SUCCESS = '[SALON SERVICE] ADD SUCCESS';
export const ADD_SALON_SERVICE_FAILED  = '[SALON SERVICE] ADD FAILED';

export function addSalonService(data) {
    const request = Utils.xapi().post('manager/service/add', data);

    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : ADD_SALON_SERVICE_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : ADD_SALON_SERVICE_FAILED,
                payload : error
            })
        });
    }
}

export const UPDATE_SALON_SERVICE_SUCCESS = '[SALON SERVICE] UPDATE SUCCESS';
export const UPDATE_SALON_SERVICE_FAILED  = '[SALON SERVICE] UPDATE FAILED';

export function updateSalonService(data) {
    const request = Utils.xapi().post('manager/service/update', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : UPDATE_SALON_SERVICE_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_SALON_SERVICE_FAILED,
                payload : error
            })
        });
    }
}

export const DELETE_SALON_SERVICE_SUCCESS = '[SALON SERVICE] DELETE SUCCESS';
export const DELETE_SALON_SERVICE_FAILED  = '[SALON SERVICE] DELETE FAILED';

export function deleteSalonService(data) {
    const request = Utils.xapi().post('manager/service/delete', data);
    
    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : DELETE_SALON_SERVICE_SUCCESS,
                payload : data.id
            })
        ).catch((error) => {
            dispatch({
                type    : DELETE_SALON_SERVICE_FAILED,
                payload : error
            })
        });
    }
}