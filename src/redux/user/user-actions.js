//actions, functions that returns object. The object should be in the correct format the action is expected to be.
//Object that the components will leverage to update the reducer with appropriate value.

import { UserActionTypes } from './user-types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});