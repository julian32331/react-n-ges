/**
 * Description: Actions of the booking.
 * Date: 2/11/2019
 */
import * as Utils from 'utils';

export const B2BSHOP_INIT = '[B2BSHOP] INIT';

export const GET_B2BSHOP_PRODUCTS_SUCCESS = '[B2BSHOP] PRODUCTS GET SUCCESS';
export const GET_B2BSHOP_PRODUCTS_FAILED = '[B2BSHOP] PRODUCTS GET FAILED';

export function getB2BShopProducts() {
    const request = Utils.xapi().post('webshop/all');
    return (dispatch) =>
        request.then((response) => {  
            dispatch({
                type: B2BSHOP_INIT
            })
            
            return dispatch({
                type: GET_B2BSHOP_PRODUCTS_SUCCESS,
                state: "Ok",
                products: response.data.articles
            });
        }).catch((error) => { 
            dispatch({
                type: B2BSHOP_INIT
            });   
            // var err = JSON.parse(error.request.response);
            return dispatch({
                type: GET_B2BSHOP_PRODUCTS_FAILED,
                state: "Error",
                // message: err.message
                message: "Error occured."
            });
        });
}