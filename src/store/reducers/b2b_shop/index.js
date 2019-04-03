/**
 * Description: B2BShop Reducers
 * Date: 4/3/2019
 */

import {combineReducers} from 'redux';

import product from './product.reducer';

const b2b_shop = combineReducers({
    product
})

export default b2b_shop;