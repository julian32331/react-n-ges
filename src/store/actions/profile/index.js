/**
 * Description: Actions for the profile.
 * Date: 1/30/2019
 */

import * as Utils from 'utils/api';
import { updateUser } from './../auth';

export const GET_PROFILE_DATA = '[PROFILE] GET';
export const GET_PROFILE_DATA_SUCCESS = '[PROFILE] GET SUCCESS';
export const GET_PROFILE_DATA_FAILED = '[PROFILE] GET FAILED';

export const UPDATE_PROFIEL_DATA = '[PROFILE] UPDATE';

export function getProfileData(data) {    
    const request = Utils.xapi().post('manager/employee/profile', data);

    return (dispatch) => {
        dispatch({
            type: GET_PROFILE_DATA
        })
        request.then((response) => {            
            dispatch(updateUser({
                avatar: response.data.EmployeeInformation.picturePath,
                name: response.data.name
            }));
            dispatch({
                type: GET_PROFILE_DATA_SUCCESS,
                payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type    : GET_PROFILE_DATA_FAILED,
                payload : error
            })
        });
    }
}

export function updateProfile(data, id) {
    const request = Utils.xapi('multipart/form-data').post('manager/employee/profile/update', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(updateUser({
                avatar: response.data.EmployeeInformation.picturePath,
                name: response.data.name
            }));      
            return dispatch({
                type: UPDATE_PROFIEL_DATA
            });
        });
}
