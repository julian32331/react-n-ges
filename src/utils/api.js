/**
 * Description: Api creater
 * Date: 4/23/2019
 */

import axios from 'axios/index';

export const root = "https://dev.geselle-one.com";
export const apiRoot = root + "/api/dev";
// export const root = 'https://staging.geselle-one.com';
// export const apiRoot = root + '/api/v1';
// export const root = "https://geselle-one.com";
// export const apiRoot = root + "/api/v1";

export const defaultAvatar = root + '/employees/avatar/default-male.png';

export const xapi = (optional) => {

    let headers = {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': optional
    }

    let xapi = axios.create({
        baseURL: apiRoot,
        headers: headers
    });

    return xapi;
};
