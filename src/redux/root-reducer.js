//The acctual base reducer object that represents all of the state of the application.
//It will be the code that combines all of the states together.

import { combineReducers } from 'redux';

import userReducer from './user/user-reducer';

import cartReducer from './cart/cart-reducer';

export default combineReducers({
    user: userReducer, //user is the key, passing the reducer that we want. and returns in one giant object.
    cart: cartReducer
})