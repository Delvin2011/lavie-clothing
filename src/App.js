import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './Pages/homepage/homepage';
import ShopPage from './Pages/shop/shop';
import SignInAndSignUpPage from './Pages/SignIn-SignUp/SignIn-SignUp';
import Header from './Components/header/header';
import {auth} from './firebase/firebase.utils';

/*we want to store the state of our user in the App (where from Google signin or email and password), so that when the user logs in, we want to store that in the App state*/
/*So that, so that we can pass into components that need it, because we want to access the user object throughout the application*/
/*So we need to change the App from function, to class component, so that we have access to the class component*/

/*How to make sure the application has been added and authenticated by firebase*/
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  //when unmount, we need to close subscription, to prevent memory leaks in our App
// the application is always listening to authentication state change.
  unsubscribeFromAuth = null;

  componentDidMount() { //normally we use fetch to get data from the backend, but its a once off thing
    //but we always want to know when firebase authentication state has changed.
    //e.g when signout, we want to knw automatically wout having to fetch. {auth} - gives us that easily
    //this is an open subscription, open messaging system btwn application & firebase.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {

      this.setState({currentUser: user});
      //user authenticated session persistance - firebase remembers who was last logged in. Which is good because we don't want user to login again after page reload.
      console.log(user);
    }); //notifies of user state change.
  }

  componentWillUnmount() {
    //this how we handle any auth changes with firebase.
    this.unsubscribeFromAuth(); //this will close the subscription.
  }

  //for our user to know when the user, is signned in or out, we pass the user state to the header.
  render(){
    return (
      <div > 
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component = {HomePage}/> 
          <Route path='/shop' component = {ShopPage}/>  
          <Route path='/signin' component = {SignInAndSignUpPage}/>  

        </Switch>  
      </div>
    );
  }
}

export default App;
