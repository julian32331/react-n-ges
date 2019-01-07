/**
 * Description: Actions of the opening hours
 * Date: 1/6/2019
 */
import * as Utils from 'utils';
import { getUserData } from './user.actions';

export const GET_HOURS      = '[HOURS] GET';
export const ADD_SPECIALDAY = '[SPECIALDAY] ADD';

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

export function addSpecialDay(data) {
    const request = Utils.xapi().post('manager/specialday/add', {
        workingForId: data.workingForId,
        specialDayData: {
            name: data.name,
            openAt: data.openAt,
            closeAt: data.closeAt
        }
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {        
                dispatch(getUserData({
                    workingForId: data.workingForId
                }));   
                return dispatch({
                    type: ADD_SPECIALDAY
                });
            }
        });
}