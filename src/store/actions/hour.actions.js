/**
 * Description: Actions of the opening hours
 * Date: 1/6/2019
 */
import * as Utils from 'utils';

export const GET_HOURS       = '[HOURS] GET';

export function getHours({workingForId}) {
    const request = Utils.xapi().post('manager/openinghours', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {                
                return dispatch({
                    type: GET_HOURS,
                    payload: response.data
                });
            }
        });
}