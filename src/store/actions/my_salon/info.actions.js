/**
 * Description: My salon Info Actions
 * Date: 3/29/2019
 */

import * as Utils from 'utils/api';

export const GET_SALON_INFO         = '[SALON INFO] GET';
export const GET_SALON_INFO_SUCCESS = '[SALON INFO] GET SUCCESS';
export const GET_SALON_INFO_FAILED  = '[SALON INFO] GET FAILED';

export function getSalonInfo(data) {
    const request = Utils.xapi().post('manager/salon', data);

    return (dispatch) => {
        dispatch({
            type: GET_SALON_INFO
        })
        request.then((response) =>
            dispatch({
                type    : GET_SALON_INFO_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : GET_SALON_INFO_FAILED,
                payload : error
            })
        });
    }        
}

export const UPDATE_SALON_INFO_SUCCESS = '[SALON INFO] UPDATE SUCCESS';
export const UPDATE_SALON_INFO_FAILED  = '[SALON INFO] UPDATE FAILED';

export function updateSalonInfo(data) {
    const request = Utils.xapi().post('manager/salon/update', data);

    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : UPDATE_SALON_INFO_SUCCESS,
                payload : {
                    ...data.salonData,
                    ShippingAddress: {
                        ...data.shippingAddress
                    }
                }
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_SALON_INFO_FAILED,
                payload : error
            })
        });
    }        
}

export const ADD_SALON_GALLERY_SUCCESS = '[SALON GALLERY] ADD SUCCESS';
export const ADD_SALON_GALLERY_FAILED  = '[SALON GALLERY] ADD FAILED';

export function addSalonGallery(data) {
    const request = Utils.xapi().post('salon/gallery/add', data);

    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : ADD_SALON_GALLERY_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : ADD_SALON_GALLERY_FAILED,
                payload : error
            })
        });
    }        
}

export const UPDATE_SALON_GALLERY_SUCCESS = '[SALON GALLERY] UPDATE SUCCESS';
export const UPDATE_SALON_GALLERY_FAILED  = '[SALON GALLERY] UPDATE FAILED';

export function updateSalonGallery(data) {
    const request = Utils.xapi().post('salon/gallery/update', data);

    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : UPDATE_SALON_GALLERY_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_SALON_GALLERY_FAILED,
                payload : error
            })
        });
    }        
}

export const DELETE_SALON_GALLERY_SUCCESS = '[SALON GALLERY] DELETE SUCCESS';
export const DELETE_SALON_GALLERY_FAILED  = '[SALON GALLERY] DELETE FAILED';

export function deleteSalonGallery(data) {
    const request = Utils.xapi().post('salon/gallery/delete', data);

    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : DELETE_SALON_GALLERY_SUCCESS,
                payload : null
            })
        ).catch((error) => {
            dispatch({
                type    : DELETE_SALON_GALLERY_FAILED,
                payload : error
            })
        });
    }        
}