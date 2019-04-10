/**
 * Description: Product Actions
 * Date: 4/3/2019
 */
import * as Utils from 'utils';

export const FEATURED_PRODUCT_REQUEST = '[PRODUCT] FEATURED REQUEST';
export const FEATURED_PRODUCT_SUCCESS = '[PRODUCT] FEATURED SUCCESS';
export const FEATURED_PRODUCT_FAILED  = '[PRODUCT] FEATURED FAILED';

export function featuredProduct(data) {
    const request = Utils.xapi().post('webshop/featured', data);

    return (dispatch) => {
        dispatch({
            type: FEATURED_PRODUCT_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : FEATURED_PRODUCT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : FEATURED_PRODUCT_FAILED,
                payload : error
            })
        });
    }        
}

export const SEARCH_PRODUCT_REQUEST = '[PRODUCT] SEARCH REQUEST';
export const SEARCH_PRODUCT_SUCCESS = '[PRODUCT] SEARCH SUCCESS';
export const SEARCH_PRODUCT_FAILED  = '[PRODUCT] SEARCH FAILED';

export function searchProduct(data) {
    const request = Utils.xapi().post('webshop/search', data);

    return (dispatch) => {
        dispatch({
            type: SEARCH_PRODUCT_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : SEARCH_PRODUCT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : SEARCH_PRODUCT_FAILED,
                payload : error
            })
        });
    }        
}

export const CATEGORY_PRODUCT_REQUEST = '[PRODUCT] CATEGORY REQUEST';
export const CATEGORY_PRODUCT_SUCCESS = '[PRODUCT] CATEGORY SUCCESS';
export const CATEGORY_PRODUCT_FAILED  = '[PRODUCT] CATEGORY FAILED';

export function categoryProduct(data) {
    const request = Utils.xapi().post('webshop/category', data);

    return (dispatch) => {
        dispatch({
            type: CATEGORY_PRODUCT_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : CATEGORY_PRODUCT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : CATEGORY_PRODUCT_FAILED,
                payload : error
            })
        });
    }        
}