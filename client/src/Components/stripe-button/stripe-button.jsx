import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_TuQvPMHNjEPDafAmwoAmr5ze00WQ7OT3US';

const onToken = token => {
    axios({
        url: 'payment',
        method: 'post',
        data: {
            amount: priceForStripe,
            token
        }
    }).then(respone => {
        alert('Payment Successful');
    }).catch(error => {
        console.log('Payment error: ', JSON.parse(error));
        alert('There was an issue with the payment. Please make sure to use provided  credit card')
    })
    
    console.log(token);
    
}
return (
    <StripeCheckout
        label = 'Pay Now'
        name = 'Lavie Clothing Ltd'
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description = {`Your total is $${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}

    />
    );
};

export default StripeCheckoutButton;