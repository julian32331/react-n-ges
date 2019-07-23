/**
 * Description: Actions for the social marketing.
 * Date: 7/22/2019
 */

import * as Utils from 'utils/api';

export const GET_SOCIAL_DATA         = '[SOCIAL DATA] GET';
export const GET_SOCIAL_DATA_SUCCESS = '[SOCIAL DATA] GET SUCCESS';
export const GET_SOCIAL_DATA_FAILED  = '[SOCIAL DATA] GET FAILED';

export function getSocialData(body) {
    const request = Utils.xapi().post('manager/affiliates', body);

    return (dispatch) => {
        dispatch({
            type: GET_SOCIAL_DATA
        })
        request.then((response) =>
            dispatch({
                type    : GET_SOCIAL_DATA_SUCCESS,
                payload : response.data.social
            })
        ).catch((error) => {
            dispatch({
                type    : GET_SOCIAL_DATA_FAILED,
                payload : error
            })
        });
    }        
}