import * as Actions from './../actions/b2bshop.actions';

const initialState = {
    state: null,
    message: '',
    products: []
};

const b2bshop = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.B2BSHOP_INIT:
        {
            return {
                ...state,
                state: null,
            };
        }
        case Actions.GET_B2BSHOP_PRODUCTS_SUCCESS:
        {
            return {
                ...state,
                state: action.state,
                products: action.products
            };
        }
        case Actions.GET_B2BSHOP_PRODUCTS_FAILED:
        {
            return {
                ...state,
                state: action.state,
                message: action.message
            };
        }
        default:
        {
            return state;
        }
    }
};

export default b2bshop;