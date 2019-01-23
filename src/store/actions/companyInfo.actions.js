/**
 * Description: Actions of the company info
 * Date: 1/12/2019
 */

import * as Utils from 'utils';

export const GET_COMPANY_INFO           = '[COMPANY INFO] GET';

export function getCompanyInfo(data) {
    const request = Utils.xapi().post('manager/company', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_COMPANY_INFO,
                info: response.data
            });
        });
}