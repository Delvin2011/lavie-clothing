import { createSelector } from 'reselect';

//input selector is a function that gets the whole state and returns a slice of it.

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser], //array of input selectors
    user => user.currentUser //outputs of the input selectors
);
