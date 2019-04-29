/**
 * Description: My salon Reducers
 * Date: 3/29/2019
 */

import {combineReducers} from 'redux';

import info from './info.reducer';
import services from './services.reducer';
import hours from './hours.reducer';

const my_salon = combineReducers({
    info,
    services,
    hours
})

export default my_salon;