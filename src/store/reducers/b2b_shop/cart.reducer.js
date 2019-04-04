/**
 * Description: Shopping cart Reducer
 * Date: 4/4/2019
 */
import * as Actions from './../../actions';

const initialState = {
    loading         : false,
    error           : '',
    cart            : [],
    shipping_address: null
};

const cart = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.SHIPPING_ADDRESS_REQUEST:
            return {
                ...state,
                loading         : true,
                error           : '',
                shipping_address: null
            };
        case Actions.SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                loading         : false,
                shipping_address: action.payload
            };
        case Actions.SHIPPING_ADDRESS_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.ORDER_REQUEST:
            return {
                ...state,
                loading         : true,
                error           : '',
            };
        case Actions.ORDER_SUCCESS:
            return {
                ...state,
                loading         : false,
                cart            : []
            };
        case Actions.SHIPPING_ADDRESS_FAILED:
            return {
                ...state,
                loading     : false,
                error       : action.payload
            };

        case Actions.GET_CART:
            return state;
        case Actions.SET_CART:
            return {
                ...state,
                cart    : action.payload
            };
        default:
            return state;
    }
};

export default cart;