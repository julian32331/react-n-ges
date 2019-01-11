/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_CHECKLIST = '[CHECKLIST] GETd';

export function getCheckList({workingForId}) {
    const request = Utils.xapi().post('manager/checklist', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_CHECKLIST,
                list: response.data.data
            });
        });
}