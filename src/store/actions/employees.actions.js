/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import axios from 'axios/index';
import * as Utils from 'utils';

export const GET_EMPLOYEES = '[EMPLOYEES] GET';

export function getEmployees({workingForId}) {
    const request = Utils.xapi().post('manager/employees', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {
                return dispatch({
                    type: GET_EMPLOYEES,
                    employees: response.data.data
                });
            }
        });
}