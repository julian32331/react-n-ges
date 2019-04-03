/**
 * Description: Product Reducer
 * Date: 3/4/2019
 */
import * as Actions from './../../actions';

const initialState = {
    loading     : false,
    error       : '',
    products    : []
};

const product = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.FEATURED_PRODUCT_REQUEST:
        case Actions.SEARCH_PRODUCT_REQUEST:
        case Actions.CATEGORY_PRODUCT_REQUEST:
            return {
                ...state,
                loading     : true,
                error       : '',
                products    : []
            };
        case Actions.FEATURED_PRODUCT_SUCCESS:
        case Actions.SEARCH_PRODUCT_SUCCESS:
        case Actions.CATEGORY_PRODUCT_SUCCESS:
            return {
                ...state,
                loading     : false,
                products    : action.payload
            };
        case Actions.FEATURED_PRODUCT_FAILED:
        case Actions.SEARCH_PRODUCT_FAILED:
        case Actions.CATEGORY_PRODUCT_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };
        default:
            return state;
    }
};

export default product;