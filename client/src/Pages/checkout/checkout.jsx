import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'; //bcoz we gonna be pulling stufff off the state

import CheckoutItem from '../../Components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../Components/stripe-button/stripe-button';
import {selectCartItems,selectCartTotal} from '../../redux/cart/cart-selectors';

import './checkout.scss';

const CheckoutPage = ({cartItems,total}) => (
    <div className = 'checkout-page'>
        <div className = 'checkout-header'>
            <div className = 'header-block'>
                <span>Product</span>
            </div>
            <div className = 'header-block'>
                <span>Description</span>
            </div>
            <div className = 'header-block'>
                <span>Quantity</span>
            </div>
            <div className = 'header-block'>
                <span>Price</span>
            </div>
            <div className = 'header-block'>
                <span>Remove</span>
            </div>
        </div>
                {
                    cartItems.map(cartItem => (
                    
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}


        <div className = 'total'>
            <span>
                TOTAL: ${total}
            </span>

        </div>
        <div className = 'test-warning'>
            *Use the below test Credit Card*
            <br/>
            4242 4242 4242 4242 - Exp 01/20 - CVV: 123
        </div>
        <StripeCheckoutButton className = 'button' price = {total}/>
    </div>
)

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);

