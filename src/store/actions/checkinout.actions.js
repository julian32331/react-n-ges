/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import axios from 'axios/index';
import * as Utils from 'utils';

export const GET_CHECKLIST_DATA = '[CHECKLIST] GET DATA';
export const SET_CHECKLIST_DATA = '[CHECKLIST] SET DATA';

export function getCheckList({token, id}) {
    const request = Utils.xapi().post('manager/checklist', {
        workingForId: id
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {
                return dispatch({
                    type: GET_CHECKLIST_DATA,
                    data: response.data.data
                });
            }
            // else
            // {
            //     return dispatch({
            //         type   : LOGIN_ERROR,
            //         payload: response.data.error
            //     });
            // }
        });
}