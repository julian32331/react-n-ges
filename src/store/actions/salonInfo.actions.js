/**
 * Description: Actions of the salon info
 * Date: 1/12/2019
 */

import * as Utils from 'utils/api';
import {setUserData, updateWorkingForId} from './user.actions';

export function addSalonInfo(data) {
    const request = Utils.xapi().post('register/salon', data);
    return (dispatch) =>
        request.then((response) => {  
            dispatch(setUserData(
                response.data
            ));           
            let companyAuthLevel = response.data.workingFor.find(item => {
                return item.workingForId === Number(data.workingForId)
            }).companyAuthLevel;
            dispatch(updateWorkingForId({
                workingForId: data.workingForId,
                isEmployee: companyAuthLevel === "EMPLOYEE"? true : false
            }));
        })
}