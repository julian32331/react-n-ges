/**
 * Description: Shopping cart Actions
 * Date: 4/4/2019
 */

import * as Utils from 'utils';

export const SHIPPING_ADDRESS_REQUEST = '[CART] SHIPPING ADDRESS REQUEST';
export const SHIPPING_ADDRESS_SUCCESS = '[CART] SHIPPING ADDRESS SUCCESS';
export const SHIPPING_ADDRESS_FAILED  = '[CART] SHIPPING ADDRESS FAILED';

export function getShippingAddress(data) {
    const request = Utils.xapi().post('webshop/shippingaddress', data);

    return (dispatch) => {
        dispatch({
            type: SHIPPING_ADDRESS_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : SHIPPING_ADDRESS_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : SHIPPING_ADDRESS_FAILED,
                payload : error
            })
        });
    }        
}

export const GET_CART = '[CART] GET';

export function getCart() {
    return (dispatch) => {
        dispatch({
            type: GET_CART
        })
    }        
}

export const SET_CART = '[CART] SET';

export function setCart(data) {
    return (dispatch) => {
        dispatch({
            type    : SET_CART,
            payload : data
        })
    }        
}

export const ORDER_REQUEST = '[CART] ORDER REQUEST';
export const ORDER_SUCCESS = '[CART] ORDER SUCCESS';
export const ORDER_FAILED  = '[CART] ORDER FAILED';

export function makeOrder(data) {
    const request = Utils.xapi().post('webshop/order', data);

    return (dispatch) => {
        dispatch({
            type: ORDER_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : ORDER_SUCCESS,
            })
        ).catch((error) => {
            dispatch({
                type    : ORDER_FAILED,
                payload : error
            })
        });
    }        
}