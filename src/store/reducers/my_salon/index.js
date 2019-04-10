/**
 * Description: My salon Reducers
 * Date: 3/29/2019
 */

import {combineReducers} from 'redux';

import info from './info.reducer';
import services from './services.reducer';

const my_salon = combineReducers({
    info,
    services
})

export default my_salon;