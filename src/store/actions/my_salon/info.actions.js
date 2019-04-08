/**
 * Description: My salon Info Actions
 * Date: 3/29/2019
 */

import * as Utils from 'utils';

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