import React from 'react';
import {connect} from 'react-redux'; //used to bing
import {clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart-actions';

import './checkout-item.scss';

//we don't have access to the cartItem property, so we do an explicit return in the function and make sure to set the const of the value.
//so as to have access to the cartItem and the clearItem function

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return( //disstructuring the values we are going to need
        <div className = 'checkout-item'>
            <div className = 'image-container'>
                <img src = {imageUrl} alt = 'item'/> 
            </div>
            <span className = 'name'>{name}</span>
            <span className = 'quantity'>
                <div className = 'arrow' onClick = {() => removeItem(cartItem)}>&#10094;</div>
                    <span className = 'value'>{quantity}</span>
                <div className = 'arrow' onClick = {() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className = 'price'>{price}</span>
            <div className = 'remove-button' onClick = {() =>clearItem(cartItem)}>&#10005;</div>
        </div>
    );
};
//new function that calls clearItem function as a prop and pass the cartItem
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))

})

export default connect(null, mapDispatchToProps)(CheckoutItem);

