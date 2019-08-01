/**
 * Description: Dashboard Actions
 * Date: 8/1/2019
 */

import * as Utils from 'utils/api';

export const GET_DASHBOARD_CAMPAIGNS         = '[DASHBOARD CAMPAIGNS] GET';
export const GET_DASHBOARD_CAMPAIGNS_SUCCESS = '[DASHBOARD CAMPAIGNS] GET SUCCESS';
export const GET_DASHBOARD_CAMPAIGNS_FAILED  = '[DASHBOARD CAMPAIGNS] GET FAILED';

export function getDashboardCampaigns(data) {
    const request = Utils.xapi().post('manager/campaigns', data);

    return (dispatch) => {
        dispatch({
            type: GET_DASHBOARD_CAMPAIGNS
        })
        request.then((response) =>
            dispatch({
                type    : GET_DASHBOARD_CAMPAIGNS_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : GET_DASHBOARD_CAMPAIGNS_FAILED,
                payload : error
            })
        });
    }        
}