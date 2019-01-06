/**
 * Description: Actions of the login
 * Date: 12/28/2018
 */

import axios from 'axios/index';

import {setUserData} from './user.actions';
import * as Utils from 'utils';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login({email, password})
{
    const request = Utils.xapi().post('employee/login', {
        email,
        password
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {                
                dispatch(setUserData(response.data));
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            }
            else
            {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response.data.error
                });
            }
        });
}