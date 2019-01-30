/**
 * Description: Actions for the profile.
 * Date: 1/30/2019
 */

import * as Utils from 'utils';

export const GET_PROFILE_DATA = '[PROFILE] DATA GET' ;
// export const ADD_SALON        = '[SALON] ADD';

export function getProfileData(data) {    
    const request = Utils.xapi().post('manager/employee/profile', data);
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_PROFILE_DATA,
                data: response.data
            });
        });
}

// export function addSalon(data) {
//     const request = Utils.xapi().post('manager/salon/add', data);
//     return (dispatch) =>
//         request.then((response) => {   
//             dispatch(setUserData(
//                 response.data
//             ));   
//             dispatch(updateWorkingForId(
//                 data.workingForId    
//             )); 
//             dispatch(getCompanySalon({
//                 workingForId: data.workingForId
//             }));
//             return dispatch({
//                 type: ADD_SALON
//             });
//         });
// }