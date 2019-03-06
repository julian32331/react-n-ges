/**
 * Description: Actions of the booking.
 * Date: 2/11/2019
 */
import * as Utils from 'utils';

export const GET_B2BSHOP_PRODUCTS = '[B2BSHOP] PRODUCTS GET';

export function getB2BShopProducts() {
    const request = Utils.xapi().post('webshop/all');
    return (dispatch) =>
        request.then((response) => {
            console.log('products: ', response.data)
            // return dispatch({
            //     type: GET_B2BSHOP_PRODUCTS
            // });
        });
}