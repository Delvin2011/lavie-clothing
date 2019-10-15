//The acctual base reducer object that represents all of the state of the application.
//It will be the code that combines all of the states together.

import { combineReducers } from 'redux';
import { persistReducer} from 'redux-persist'; //allow the browser to store the cache
import storage from 'redux-persist/lib/storage'; //telling the app to use local library for storage

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart-reducer';
import directoryReducer from './directory/directory-reducer';
import shopReducer from './shop/shop-reducer';

const persistConfig = {
    key: 'root', //telling at what point in the reducer we want to start storing everything
    storage,
    whitelist: ['cart'] //contains the string names of any of the reducer that we want to store, user and cart. But user info is being persisted by firebase, so only cart reducer

}

const rootReducer  = combineReducers({
    user: userReducer, //user is the key, passing the reducer that we want. and returns in one giant object.
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig,rootReducer); // return the modified version of the rootReducer with the persistConfig - persistance capabilities
