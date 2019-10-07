import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'; //Redirect - to prohibit signin route once user is signed in. to avoid Auth flow
import {connect} from 'react-redux'; //high order component that lets us modify our component to have access to things related to redux.
import {createStructuredSelector} from 'reselect';

import HomePage from './Pages/homepage/homepage';
import ShopPage from './Pages/shop/shop';
import SignInAndSignUpPage from './Pages/SignIn-SignUp/SignIn-SignUp';
import CheckoutPage from './Pages/checkout/checkout';

import Header from './Components/header/header';
import {auth} from './firebase/firebase.utils';
import { createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user-actions';
import {selectCurrentUser} from './redux/user/user-selectors';


/*we want to store the state of our user in the App (where from Google signin or email and password), so that when the user logs in, we want to store that in the App state*/
/*So that, so that we can pass into components that need it, because we want to access the user object throughout the application*/
/*So we need to change the App from function, to class component, so that we have access to the class component*/

/*How to make sure the application has been added and authenticated by firebase*/
class App extends React.Component {
//when unmount, we need to close subscription, to prevent memory leaks in our App
// the application is always listening to authentication state change.
  unsubscribeFromAuth = null;

  componentDidMount() { //normally we use fetch to get data from the backend, but its a once off thing

    const {setCurrentUser} = this.props;
    //but we always want to know when firebase authentication state has changed.
    //e.g when signout, we want to knw automatically wout having to fetch. {auth} - gives us that easily
    //this is an open subscription, open messaging system btwn application & firebase.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //Data is stored in the database, but we need to store the data in the state, so we can use in our App.
      //user authenticated session persistance - firebase remembers who was last logged in. Which is good because we don't want user to login again after page reload.
      
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //listening/subscribe to the userRef for any changes in the data
        userRef.onSnapshot(snapShot => { //returns the data of the user, authenticated or already stored in the database
          setCurrentUser({
              id: snapShot.id, //returns the id
              ...snapShot.data() //returns the user object stored in the database, need to have .data().
          });//console log when state has finished, since its asynchronous    
        });
      }
      //if user logs out, set currentUser to null (that will come from the Auth libray).
      setCurrentUser(userAuth);
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
        <Header/>
        <Switch>
          <Route exact path='/' component = {HomePage}/> 
          <Route path='/shop' component = {ShopPage}/>  
          <Route exact path='/checkout' component = {CheckoutPage}/>  
          <Route exact path='/signin' render = {() => this.props.currentUser
            ? (<Redirect to='/' />) 
            : (<SignInAndSignUpPage />)}/>  

        </Switch>  
      </div>
    );
  }
}

//render - Javascript invokation that determines what component to return.
//used to reroute to home page once user is signed in.

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({ //gets the dispatch property (dispatches the new action we need to pass, SET_CURRENT_USER)
  // returns setCurrentUser, goes to function that gets the user object and calls dispatch
  //dispatch is a way for redux to know the object being passed is an action object that is going to be passed to every reducer.
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
//App doesn't need the current user state, apart from the header component, it only sets the default state.
//Therefore passing null.
export default connect(mapStateToProps, mapDispatchToProps)(App);

/*mapDispatchToProps pass function that can trigger state change to your component props and mapStateToProps pass state to your component props*/
