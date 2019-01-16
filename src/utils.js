/**
 * Description: Variouse constants for the app
 * Date: 12/28/2018
 */
import axios from 'axios/index';

import store from './store.js';

export const root = "https://dev.geselle-one.com/api/dev";
// export const root = "https://geselle-one.com/api/v1";

export const xapi = () => {
    let token = null;
    if (store.getState().user.token) {
        token = store.getState().user.token;
    } else {
        token = localStorage.token;
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