import React from 'react';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.scss';

//we need to store what the user is putting in the form input
class SignUp extends React.Component {
    constructor(){
        super();
    
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    //will be an async function that gets the event
    handleSubmit = async event => {
        //prevent the default action, submit
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
         alert("Passwords don't match");
         return;   
        }
        //new auth method that comes with the Auth Library
        try {
            //Creates a new user account associated with the specified email address and password.
            //On successful creation of the user account, this user will also be signed in to your application and return with User object.
            //once succ
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            //await create user profile to finish
            await createUserProfileDocument(user, {displayName})
            //await and set state to empty
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }    
    }

    handleChange = event => { //destructure off of the event
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render(){
        //destructure
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className = 'sign-up'>
                <h2 className = 'title'>I do not have an account</h2>
                <span>Sign up with your e-mail and password</span>
                <form className = 'sign-up-form' onSubmit = {this.handleSubmit}>
                    <FormInput type = 'text' name = 'displayName' value = {displayName} onChange = {this.handleChange} label = 'Display Name' required/>
                    <FormInput type = 'email' name = 'email' value = {email} onChange = {this.handleChange} label = 'Email' required/>
                    <FormInput type = 'password' name = 'password' value = {password} onChange = {this.handleChange} label = 'Password' required/>
                    <FormInput type = 'password' name = 'confirmPassword' value = {confirmPassword} onChange = {this.handleChange} label = 'Confirm Password' required/>
                    <CustomButton type = 'submit'> SIGN UP</CustomButton>
                
                </form>
            </div>
        )
    }
}

export default SignUp;