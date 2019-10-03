import CartActionTypes from './cart-type';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN //we do not need the payload in this case.
});