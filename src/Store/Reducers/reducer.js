import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter:0
}

const add_counter = (state, action) => {
    return updateObject(state,{
        counter: state.counter + action.value
    });
}

const reducer =  (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COUNTER: return add_counter(state, action)

        default:
            return state;

    }
}

export default reducer;