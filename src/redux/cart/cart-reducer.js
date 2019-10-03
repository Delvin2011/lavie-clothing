//hide the website when 1st comes to website
import CartActionTypes from './cart-type';
import { addItemToCart } from './cart-utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [] //adding or removing cart items
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN: //option can be open or closed hence toggle
            return{
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload) //add new items to the existing list
            }
            default:
                return state;
        
            

    }
}   

export default cartReducer;