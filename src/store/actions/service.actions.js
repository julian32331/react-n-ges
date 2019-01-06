/**
 * Description: Reducer of the service data
 * Date: 1/3/2019
 */
import axios from 'axios/index';
import * as Utils from 'utils';

export const GET_SERVICE_DATA = '[SERVICE] GET DATA';
export const SET_SERVICE_DATA = '[SERVICE] SET DATA';

export function getServiceData({id}) {
    const request = Utils.xapi().post('manager/services', {
        workingForId: id
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {                
                return dispatch({
                    type: GET_SERVICE_DATA,
                    data: response.data.services
                });
            }
            // else
            // {
            //     return dispatch({
            //         type   : LOGIN_ERROR,
            //         payload: response.data.error
            //     });
            // }
        });
}

export function setServiceData(data) {
    const request = Utils.xapi().post('manager/add/service', {
        workingForId: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        durationInMinutes: data.durationInMinutes
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {            
                return dispatch({
                    type: SET_SERVICE_DATA,
                    data: data
                });
            }
        });
}