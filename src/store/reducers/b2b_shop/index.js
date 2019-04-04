/**
 * Description: B2BShop Reducers
 * Date: 4/3/2019
 */

import {combineReducers} from 'redux';

import product from './product.reducer';
import cart from './cart.reducer';

const b2b_shop = combineReducers({
    product,
    cart
})

export default b2b_shop;