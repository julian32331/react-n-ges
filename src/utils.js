/**
 * Description: Variouse constants for the app
 * Date: 12/28/2018
 */
import axios from 'axios/index';

import store from './store.js';
import * as Actions from 'store/actions';

export const root = "http://18.195.182.166/api/v1/";

export const xapi = () => {
    let token = null;
    if (store.getState().user.token) {
        token = store.getState().user.token;
    } else {
        token = localStorage.token;
        // store.dispatch(Actions.getUserData());
    }

    let headers = null;

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`
        }
    }

    let xapi = axios.create({
        baseURL: root,
        headers: headers
    });

    // Check expired token
    // xapi.interceptors.response.use(undefined, function(err) {
    //     if (err.response.status === 401) {
    //         store.dispatch(logout());
    //     }
    // });

    return xapi;
};