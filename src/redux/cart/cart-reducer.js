//hide the website when 1st comes to website
import CartActionTypes from './cart-type';

const INITIAL_STATE = {
    hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN: //option can be open or closed hence toggle
            return{
                ...state,
                hidden: !state.hidden
            }
            default:
                return state;

    }
}   

export default cartReducer;