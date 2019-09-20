import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './Pages/homepage/homepage';
import ShopPage from './Pages/shop/shop.jsx'



function App() {
  return (
    <div > 
      <Switch>
        <Route exact path='/' component = {HomePage}/> 
        <Route path='/shop' component = {ShopPage}/>  
      </Switch>  
    </div>
  );
}

export default App;
