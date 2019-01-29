/**
 * Description: Actions for the my salons.
 * Date: 1/29/2019
 */

import * as Utils from 'utils';
import {setUserData, updateWorkingForId} from './user.actions';

export const ADD_SALON        = '[SALON] ADD';

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
            console.log('add my salon: ', response)
            // return dispatch({
            //     type: ADD_SALON
            // });
        });
}