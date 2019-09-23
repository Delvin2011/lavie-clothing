import React from 'react';

import './form-input.scss';

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className = "group">
        <input className = 'form-input' onChange = {handleChange} {...otherProps}/>
        {
            label ?
            (<label className = {`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            {label}
            </label>)
            : null
        }
    </div>

)

export default FormInput;
















/*To style the signin input
- Managing the lable and the mocro-interaction (suggesting names and passwords)
- Its a funcitiona component and no need for a state
- handleChange to bubble up any unchange that the inout might have.
- ...otherProps will be the name, email, value passes to form-input
- label will be selectively rendered (a string interpolated value)*/