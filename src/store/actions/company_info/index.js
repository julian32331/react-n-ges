/**
 * Description: Company Information Actions
 * Date: 4/26/2019
 */

import * as Utils from 'utils/api';

export const GET_COMPANY_INFO         = '[COMPANY INFO] GET';
export const GET_COMPANY_INFO_SUCCESS = '[COMPANY INFO] GET SUCCESS';
export const GET_COMPANY_INFO_FAILED  = '[COMPANY INFO] GET FAILED';

export function getCompanyInfo(data) {
    const request = Utils.xapi().post('manager/company', data);

    return (dispatch) => {
        dispatch({
            type: GET_COMPANY_INFO
        })
        request.then((response) =>
            dispatch({
                type    : GET_COMPANY_INFO_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : GET_COMPANY_INFO_FAILED,
                payload : error
            })
        });
    }        
}

export const UPDATE_COMPANY_INFO_SUCCESS    = '[COMPANY INFO] UPDATE SUCCESS';
export const UPDATE_COMPANY_INFO_FAILED      = '[COMPANY INFO] UPDATE FAILED';

export function updateCompanyInfo(data) {
    const request = Utils.xapi().post('manager/company/update', data);

    console.log('focus: ', {
        ...data.companyData,
        CompanyEconomy: {
            ...data.companyEconomyData
        }
    })

    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : UPDATE_COMPANY_INFO_SUCCESS,
                payload : {
                    ...data.companyData,
                    CompanyEconomy: {
                        ...data.companyEconomyData
                    }
                }
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_COMPANY_INFO_FAILED,
                payload : error
            })
        });
    }        
}