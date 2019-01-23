/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_EMPLOYEES = '[EMPLOYEES] GET';
export const UPDATE_EMPLOYEE     = '[EMPLOYEE] UPDATE';
export const DELETE_EMPLOYEE     = '[EMPLOYEE] DELETE';
export const CHECK_EMPLOYEE      = '[EMPLOYEE] CHECK';
export const CHECK_EMPLOYEE_SUCCESS = '[EMPLOYEE] CHECK SUCCESS';
export const INVITE_EMPLOYEE      = '[EMPLOYEE] INVITE';
export const ADD_EMPLOYEE      = '[EMPLOYEE] ADD';

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

export function updateEmployee(data) {
    const request = Utils.xapi().post('manager/employee/update', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getEmployees({
                workingForId: data.workingForId
            }));  
            return dispatch({
                type: UPDATE_EMPLOYEE,
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
                type: DELETE_EMPLOYEE
            });
        });
}

export function checkEmployee(data) {
    const request = Utils.xapi().post('employee/check', data);
    return (dispatch) =>
        request.then((response) => {  
            dispatch({
                type: CHECK_EMPLOYEE
            });   
            return dispatch({
                type: CHECK_EMPLOYEE_SUCCESS,
                employee: response.data.employee
            });
        });
}

export function inviteEmployee(data) {
    const request = Utils.xapi().post('employee/invite/rentachair', data);
    return (dispatch) =>
        request.then((response) => { 
            return dispatch({
                type: INVITE_EMPLOYEE
            });
        });
}

export function addEmployee(data) {
    const request = Utils.xapi().post('employee/add', data);
    return (dispatch) =>
        request.then((response) => {  
            dispatch(getEmployees({
                workingForId: data.workingForId
            })); 
            return dispatch({
                type: ADD_EMPLOYEE
            });
        });
}