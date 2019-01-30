/**
 * Description: Actions for the my salons.
 * Date: 1/29/2019
 */

import * as Utils from 'utils';
import {setUserData, updateWorkingForId} from './user.actions';

export const GET_COMPANY_SALON = '[COMPANY SALON] GET' ;
export const ADD_SALON        = '[SALON] ADD';

export function getCompanySalon(data) {    
    const request = Utils.xapi().post('manager/overview', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_COMPANY_SALON,
                data: response.data
            });
        });
}

export function addSalon(data) {
    const request = Utils.xapi().post('manager/salon/add', data);
    return (dispatch) =>
        request.then((response) => {   
            dispatch(setUserData(
                response.data
            ));   
            dispatch(updateWorkingForId(
                data.workingForId    
            )); 
            dispatch(getCompanySalon({
                workingForId: data.workingForId
            }));
            return dispatch({
                type: ADD_SALON
            });
        });
}