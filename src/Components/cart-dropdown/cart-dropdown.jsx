import React from 'react';
import {connect} from 'react-redux';
import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';
import { selectCartItems } from '../../redux/cart/cart-selectors';

import CartItem from '../cart-item/cart-item';

const CartDropdown = ({cartItems}) => (
    <div className = 'cart-dropdown'>
        <div className = 'cart-items'> 
            {
                cartItems.map(cartItem => (<CartItem key = {cartItem.id} item = {cartItem}/> ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>

    </div>
);

//this will make sure the cardDropdown component is not getting re-rendered whenever the state cchanges not related to dropdown
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})
export default connect(mapStateToProps)(CartDropdown);

