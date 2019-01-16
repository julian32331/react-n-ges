/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_CHECKLIST = '[CHECKLIST] GET';
export const ADD_CHECKLIST = '[CHECKLIST] ADD';
export const UPDATE_CHECKLIST = '[CHECKLIST] UPDATE';

export function getCheckList(data) {
    const request = Utils.xapi().post('manager/checklist', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_CHECKLIST,
                list: response.data.data
            });
        });
}

export function checkIn(data) {
    const request = Utils.xapi().post('employee/checkin', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getCheckList({
                workingForId: data.workingForId
            }));   
            return dispatch({
                type: ADD_CHECKLIST
            });
        });
}

export function checkOut(data) {
    const request = Utils.xapi().post('employee/checkout', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getCheckList({
                workingForId: data.workingForId
            }));   
            return dispatch({
                type: UPDATE_CHECKLIST
            });
        });
}