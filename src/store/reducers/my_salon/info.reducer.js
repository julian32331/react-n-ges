/**
 * Description: My salon Info reducer
 * Date: 3/30/2019
 */

import * as Actions from './../../actions';

const initialState = {
    loading : false,
    error   : '',
    info    : null,
    gallery : null
};

const info = function (state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_SALON_INFO:
            return {
                ...state,
                loading : true,
                error   : '',
                info    : null,                
                gallery : null
            };
        case Actions.GET_SALON_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                info    : action.payload,
                gallery : action.payload.Galleries[0]
            };
        case Actions.GET_SALON_INFO_FAILED:
            return {
                ...state,
                loading : false,
                error   : action.payload
            };

        case Actions.UPDATE_SALON_INFO_SUCCESS:
            return {
                ...state,
                info: {
                    ...state.info,
                    ...action.payload
                }
            };
        case Actions.UPDATE_SALON_INFO_FAILED:
            return {
                ...state,
                error: action.payload
            };
            
        case Actions.ADD_SALON_GALLERY_SUCCESS:
        case Actions.UPDATE_SALON_GALLERY_SUCCESS:
        case Actions.DELETE_SALON_GALLERY_SUCCESS:
            return {
                ...state,
                gallery : action.payload
            };
        case Actions.ADD_SALON_GALLERY_FAILED:
        case Actions.UPDATE_SALON_GALLERY_FAILED:
        case Actions.DELETE_SALON_GALLERY_FAILED:
            return {
                ...state,
                error   : action.payload
            };
        default:
            return state;
    }
}

export default info;