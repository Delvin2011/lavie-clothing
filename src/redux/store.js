//add middleware to our store, so that whenever actions get fired or dispatched, we can catch them and display them and the middleware (betwn actions firing and root reducer)
//Middleware, functions that take actions and gives output to reducers.

import { createStore, applyMiddleware} from 'redux';
import logger from 'react-redux'; //to use for debugging redux code

import rootReducer from './root-reducer';

//the middleware that the store is expecting from redux, is going to be an array.
const middlewares = [logger];

//Create the store object, instantiated with createStore
//createStore, function that will get the root-reducer and the return value of applyMiddleware
const store = createStore(rootReducer, applyMiddleware(...middlewares)) //...middleware, is to spread all the values in the array. Pass as individual arguments.

export default store;

