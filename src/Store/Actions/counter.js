import * as actionTypes from './actionTypes'


export const add_counter = (value) => {
    return {
        type: actionTypes.ADD_COUNTER,
        value: value,
    };
};