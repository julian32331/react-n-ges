/**
 * Description: Reducer of the service data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_SERVICES       = '[SERVICES] GET';
export const ADD_SERVICE        = '[SERVICE] ADD';
export const DELETE_SERVICE     = '[SERVICE] DELETE';
export const UPDATE_SERVICE     = '[SERVICE] UPDATE';

export function getServices({workingForId}) {
    const request = Utils.xapi().post('manager/services', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {                
                return dispatch({
                    type: GET_SERVICES,
                    services: response.data.services
                });
            }
        });
}

export function addService(data) {
    const request = Utils.xapi().post('manager/service/add', {
        workingForId: data.workingForId,
        name: data.name,
        description: data.description,
        price: data.price,
        durationInMinutes: data.durationInMinutes
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {     
                dispatch(getServices({
                    workingForId: data.workingForId
                }));        
                return dispatch({
                    type: ADD_SERVICE
                });
            }
        });
}

export function updateService(data) {
    const request = Utils.xapi().post('manager/service/update', {
        workingForId: data.workingForId,
        id: data.id,
        serviceData: {
            name: data.name,
            description: data.description,
            price: data.price,
            durationInMinutes: data.durationInMinutes
        }
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {          
                dispatch(getServices({
                    workingForId: data.workingForId
                }));  
                return dispatch({
                    type: UPDATE_SERVICE,
                });
            }
        });
}

export function deleteService(data) {
    const request = Utils.xapi().post('manager/service/delete', {
        workingForId: data.workingForId,
        id: data.id
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {        
                dispatch(getServices({
                    workingForId: data.workingForId
                }));     
                return dispatch({
                    type: DELETE_SERVICE
                });
            }
        });
}
