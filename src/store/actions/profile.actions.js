/**
 * Description: Actions for the profile.
 * Date: 1/30/2019
 */

import * as Utils from 'utils';

export const GET_PROFILE_DATA = '[PROFILE] DATA GET';
export const UPDATE_PROFIEL_DATA = '[PROFILE] DATA UPDATE';

export function getProfileData(data) {    
    const request = Utils.xapi().post('manager/employee/profile', data);
    return (dispatch) =>
        request.then((response) => {
            localStorage.setItem('avatar', response.data.EmployeeInformation.picturePath)
            return dispatch({
                type: GET_PROFILE_DATA,
                data: response.data
            });
        });
}

export function updateProfile(data, id) {
    const request = Utils.xapi('multipart/form-data').post('manager/employee/profile/update', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getProfileData({
                workingForId: id
            }));  
            return dispatch({
                type: UPDATE_PROFIEL_DATA,
            });
        });
}