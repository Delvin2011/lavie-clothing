import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; //is a component that we want to rap around the entire application. So that everything has access to the store object.It is the parent of everything inside the App.
import './index.css';
import App from './App';

import store from './redux/store';


ReactDOM.render(
   <Provider store = {store}> dispatch actions to the store
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,   
    document.getElementById('root')
    );

   // Provider store = {store} dispatch actions to the store