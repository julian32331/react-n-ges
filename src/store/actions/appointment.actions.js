/**
 * Description: Actions of the booking appointment.
 * Date: 2/20/2019
 */
import * as Utils from 'utils';

export const GET_APPOINTMENTS = '[APPOINTMENTS] GET';

export function getAppointments(data) {
    const request = Utils.xapi().post('booking/dashboard/timelineday', data);
    return (dispatch) =>
        request.then((response) => {
            console.log('appointments: ', response.data);
        });
}