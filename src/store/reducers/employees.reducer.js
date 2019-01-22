/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    employees: [],
    employee: null
};

const employees = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EMPLOYEES:
        {
            return {
                employees: action.employees,
                employee: state.employee
            };
        }
        case Actions.UPDATE_EMPLOYEE:
        {
            return {
                employees: state.employees
            };
        }
        case Actions.DELETE_SERVICE:
        {
            return {
                employees: state.employees
            };
        }
        case Actions.CHECK_EMPLOYEE:
        {
            return {
                employees: state.employees,
                employee: null
            };
        }
        case Actions.CHECK_EMPLOYEE_SUCCESS:
        {
            return {
                employees: state.employees,
                employee: action.employee
            };
        }
        case Actions.ADD_EMPLOYEE:
        {
            return {
                employees: state.employees
            };
        }
        default:
        {
            return state
        }
    }
};

export default employees;