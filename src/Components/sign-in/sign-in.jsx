import React from 'react';

import FormInput from '../../Components/form-input/form-input';
import CustomButton from '../../Components/custom-button/custom-button';
import {signInWithGoogle} from '../../firebase/firebase.utils';
import './sign-in.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({email:'', password: ''})
    }
    
    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }
    render(){
        return(
            <div className = "sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your e-mail and password.</span>

                <form onSubmit = {this.handleSubmit}>
                    <FormInput name = "email" type = "email" value = {this.state.email} handleChange={this.handleChange} label = 'Email' required />
                    <FormInput name = "password" type = "password" value = {this.state.password} handleChange={this.handleChange} label='Password' required />
                    <div className='buttons'>
                        <CustomButton type = "submit"> Sign In </CustomButton>
                        <CustomButton onClick = {signInWithGoogle} isGoogleSignIn>{''}SIGN IN WITH GOOGLE{''}</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;

//onClick will call the signInWithGoogle method to handle the authentication
//isGoogleSignIn property will get passed a value of true, if we dont pass a value to it.