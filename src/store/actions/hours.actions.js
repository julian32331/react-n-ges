/**
 * Description: Actions of the opening hours
 * Date: 1/6/2019
 */
import * as Utils from 'utils';

export const GET_HOURS          = '[HOURS] GET';
export const ADD_SPECIALDAY     = '[SPECIALDAY] ADD';
export const UPDATE_SPECIALDAY  = '[SPECIALDAY] UPDATE';
export const DELETE_SPECIALDAY  = '[SPECIALDAY] DELETE';

export function getHours(data) {
    const request = Utils.xapi().post('manager/openinghours', data);
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

export function addSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/add', data);
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {        
                dispatch(getHours({
                    workingForId: data.workingForId
                }));   
                return dispatch({
                    type: ADD_SPECIALDAY
                });
            }
        });
}

export function updateSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/update', data);
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {          
                dispatch(getHours({
                    workingForId: data.workingForId
                }));  
                return dispatch({
                    type: UPDATE_SPECIALDAY,
                });
            }
        });
}

export function deleteSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/delete', data);
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {        
                dispatch(getHours({
                    workingForId: data.workingForId
                }));     
                return dispatch({
                    type: DELETE_SPECIALDAY
                });
            }
        });
}