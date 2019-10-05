import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart-actions';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.scss';
import { selectCartItemsCount } from '../../redux/cart/cart-selectors';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className = 'cart-icon' onClick = {toggleCartHidden} >
        <ShoppingIcon className = 'shopping-icon' />
        <span className = 'item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()) //function that triggers toggle
})
// pull the state in and display the value, pull the cart off from the state
// This is called a selector. we are getting the cart and reducing off of the cartItems.
//computing the new value based of off the state
const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});

export default connect (mapStateToProps, mapDispatchToProps) (CartIcon);

/*mapDispatchToProps pass function that can trigger state change to your component props and mapStateToProps pass state to your component props*/