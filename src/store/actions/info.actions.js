/**
 * Description: Actions of the info
 * Date: 1/12/2019
 */

import * as Utils from 'utils';

export const GET_INFO       = '[INFO] GET';
export const ADD_INFO           = '[INFO] ADD';
export const ADD_INFO_SUCCESS   = '[INFO] ADD SUCCESS';
export const ADD_INFO_ERROR     = '[INFO] ADD ERROR';

export function getInfo(data) {
    const request = Utils.xapi().post('manager/salon', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_INFO,
                info: response.data
            });
        });
}

export function addInfo(data) {
    const request = Utils.xapi().post('manager/salon/update', data);
    return (dispatch) =>
        request.then(() => {          
            dispatch({
                type: ADD_INFO
            }); 
            return dispatch({
                type: ADD_INFO_SUCCESS
            });
        }).catch((error) => {     
            dispatch({
                type: ADD_INFO
            });
            return dispatch({
                type: ADD_INFO_ERROR,
                errorMsg: JSON.parse(error.request.response).error
            });
        });
}