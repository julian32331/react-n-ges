/**
 * Description: Auth actions
 * Date: 4/19/2019
 */

export const SET_USER = '[AUTH] SET USER';

export function setUser(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('workingFor', JSON.stringify(data.workingFor));
    localStorage.setItem('username', data.employeeName);
    localStorage.setItem('avatar', data.avatar);
    
    return (dispatch) => {
        dispatch({
            type        : SET_USER,
            token       : data.token,
            workingFor  : JSON.stringify(data.workingFor),
            username    : data.employeeName,
            avatar      : data.avatar
        })
    }
}

export const GET_USER = '[AUTH] GET USER';

export function getUser() {    
    return async (dispatch) => {
        dispatch({
            type        : GET_USER,
            token       : localStorage.token,
            workingFor  : localStorage.workingFor,
            workingForId: localStorage.workingForId,
            isEmployee  : localStorage.isEmployee,
            avatar      : localStorage.avatar,
            username    : localStorage.username
        })
    }
}

export const UPDATE_USER = '[AUTH] UPDATE USER';

export function updateUser(data) {
    Object.keys(data).map(key => {
        if (key === "workingFor") {
            console.log('focus: ', JSON.stringify(data[key]))
            localStorage.setItem(key, JSON.stringify(data[key]))
        } else {
            localStorage.setItem(key, data[key])
        }
    })
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER,
            data
        })
    }
}