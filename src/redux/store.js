//add middleware to our store, so that whenever actions get fired or dispatched, we can catch them and display them and the middleware (betwn actions firing and root reducer)
//Middleware, functions that take actions and gives output to reducers.

import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'; //to use for debugging redux code
import rootReducer from './root-reducer';
import { persistStore} from 'redux-persist'; //allow the browser to store the cache

//the middleware that the store is expecting from redux, is going to be an array.
const middlewares = [];
//removing redux-logger from production build
if(process.env.NODE_ENV === 'development'){ //NODE_ENV - set by react. either development,production or test
    middlewares.push(logger);
}

//Create the store object, instantiated with createStore
//createStore, function that will get the root-reducer and the return value of applyMiddleware
export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //...middleware, is to spread all the values in the array. Pass as individual arguments.

export const persistor = persistStore(store); //a persisted version of the state



export default ({store,persistor});
//When actions come through, being dispatched by the action creaters, they hit and update the reducer but along the way they also pass the middleware that is applied thru applyMiddleware all.
//middlewares - functions that catch action and do something and return the actions and continues down to update the reducers
// the logger is a middleware that catches the action and logs it to us. B4 and after the state is updated.
