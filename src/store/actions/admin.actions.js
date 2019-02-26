/**
 * Description: Actions of the booking appointment.
 * Date: 2/20/2019
 */
import * as Utils from 'utils';

export const INIT_ADMIN = '[ADMIN] INIT';

export const GET_BOOKINGDATA_SUCCESS = '[BOOKINGDATA] GET SUCCESS';
export const GET_BOOKINGDATA_FAILED = '[BOOKINGDATA] GET FAILED';

export function getBookingList(data) {
    const request = Utils.xapi().post('booking/dashboard/timelineday', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: INIT_ADMIN
            })

            return dispatch({
                type: GET_BOOKINGDATA_SUCCESS,
                bookingData: response.data.bookingData,
                hairdressers: response.data.hairdressers
            })
        }).catch((error) => {     
            dispatch({
                type: INIT_ADMIN
            });
            
            return dispatch({
                type: GET_BOOKINGDATA_FAILED,
                errorMsg: JSON.parse(error.request.response).error
            });
        });
}