/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_EMPLOYEES = '[EMPLOYEES] GET';
export const DELETE_EMPLOYEES     = '[EMPLOYEES] DELETE';

export function getEmployees({workingForId}) {
    const request = Utils.xapi().post('manager/employees', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_EMPLOYEES,
                employees: response.data.employees
            });
        });
}

export function deleteEmployee(data) {
    const request = Utils.xapi().post('manager/employee/delete', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getEmployees({
                workingForId: data.workingForId
            }));     
            return dispatch({
                type: DELETE_EMPLOYEES
            });
        });
}