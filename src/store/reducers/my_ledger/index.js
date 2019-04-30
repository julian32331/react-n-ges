/**
 * Description: My ledger Reducers
 * Date: 4/30/2019
 */

import {combineReducers} from 'redux';

import check from './check.reducer';

const my_ledger = combineReducers({
    check,
})

export default my_ledger;