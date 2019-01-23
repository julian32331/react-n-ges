/**
 * Description: Actions of the salon info
 * Date: 1/12/2019
 */

import * as Utils from 'utils';

export const GET_SALON_INFO           = '[SALON INFO] GET';
export const ADD_SALON_INFO           = '[SALON INFO] ADD';
export const ADD_SALON_INFO_SUCCESS   = '[SALON INFO] ADD SUCCESS';
export const ADD_SALON_INFO_ERROR     = '[SALON INFO] ADD ERROR';

export function getSalonInfo(data) {
    const request = Utils.xapi().post('manager/salon', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_SALON_INFO,
                info: response.data
            });
        });
}

export function addSalonInfo(data) {
    const request = Utils.xapi().post('manager/salon/update', data);
    return (dispatch) =>
        request.then(() => {          
            dispatch({
                type: ADD_SALON_INFO
            }); 
            return dispatch({
                type: ADD_SALON_INFO_SUCCESS
            });
        }).catch((error) => {     
            dispatch({
                type: ADD_SALON_INFO
            });
            return dispatch({
                type: ADD_SALON_INFO_ERROR,
                errorMsg: JSON.parse(error.request.response).error
            });
        });
}