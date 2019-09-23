import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './Pages/homepage/homepage';
import ShopPage from './Pages/shop/shop';
import SignInAndSignUpPage from './Pages/SignIn-SignUp/SignIn-SignUp';
import Header from './Components/header/header';


function App() {
  return (
    <div > 
      <Header/>
      <Switch>
        <Route exact path='/' component = {HomePage}/> 
        <Route path='/shop' component = {ShopPage}/>  
        <Route path='/signin' component = {SignInAndSignUpPage}/>  

      </Switch>  
    </div>
  );
}

export default App;
