import React from 'react';

import './custom-button.scss';

const CustomButton = ({children, ...otherProps}) => (
    <button className = 'custom-button' {...otherProps}>
    {children}

    </button>

);

export default CustomButton;



/*Create stateless functional component
- get the children that get passed off of our props that gets passd to CustomButton
- distructure the props of otherProps into the button (if we get a type submit, the button will get that)
- put children inside of the custom button.*/