/**
 * Description: Actions for the dashboard.
 * Date: 6/11/2019
 */

export const SET_LOCALS = '[LOCALS] SET';

export function setLocales(data) {
    return (dispatch) => {
        dispatch({
            type: SET_LOCALS,
            locales: data
        })
    }
}