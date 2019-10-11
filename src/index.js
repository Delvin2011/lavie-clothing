import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; //is a component that we want to rap around the entire application. So that everything has access to the store object.It is the parent of everything inside the App.
import {PersistGate} from 'redux-persist/integration/react';
import './index.css';
import App from './App';

import {store,persistor} from './redux/store';



ReactDOM.render(
   <Provider store = {store}> 
      <BrowserRouter>
         <PersistGate persistor = {persistor}></PersistGate>
         <App />
      </BrowserRouter>
   </Provider>,   
    document.getElementById('root')
    );

   // Provider store = {store} dispatch actions to the store

   /* Maintain cart state across sessions, leverage local storage in order to persist the application state across sessions
   The persist action is checking whether or not anything exist and if it does it will fire off a  new action that rehydrates the state with whatever is stored inside the storage*/