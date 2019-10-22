//User reducer, will store the state of the current user.
//The reducer is a function that gets 2 properties, 1. state object that we need to store (last or inital state) 2. An action, an object that has a type - string value.

import { UserActionTypes } from './user-types';

const INITIAL_STATE = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => { // if state is undefined, set to state = INITIAL_STATE
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload //flexible value that we get on the object, setting the current user value with the payload
            }


        default:
            return state;

    }
}

export default userReducer;
