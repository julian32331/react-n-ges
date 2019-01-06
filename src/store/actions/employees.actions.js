/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import axios from 'axios/index';
import * as Utils from 'utils';

export const GET_EMPLOYEES_DATA = '[EMPLOYEES] GET DATA';
export const SET_EMPLOYEES_DATA = '[EMPLOYEES] SET DATA';

export function getEmployeeList({token, id}) {
    const request = Utils.xapi().post('manager/employees', {
        workingForId: id
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {
                return dispatch({
                    type: GET_EMPLOYEES_DATA,
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