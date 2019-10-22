import React from 'react';
import SignIn from '../../Components/sign-in/sign-in';
import SignUp from '../../Components/sign-up/sign-up';
import './SignIn-SignUp.scss';

const SignInAndSignUpPage = () => (
<div className = 'SignIn-SignUp'>
    <SignIn />
    <SignUp />
</div>
);

export default SignInAndSignUpPage;
