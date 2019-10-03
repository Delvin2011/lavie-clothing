import CartActionTypes from './cart-type';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN //we do not need the payload in this case.
});

//action that gets the item that we want to add and return new action type.
//where the action type is CartActionTypes.ADD_ITEM
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})