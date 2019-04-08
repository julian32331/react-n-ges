/**
 * Description: My salon Reducers
 * Date: 3/29/2019
 */

import {combineReducers} from 'redux';

import info from './info.reducer';

const my_salon = combineReducers({
    info
})

export default my_salon;