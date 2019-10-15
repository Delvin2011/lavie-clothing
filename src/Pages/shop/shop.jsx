import React from 'react';
import {Route} from 'react-router-dom'; //putting the collections over-view in a route
import CollectionsOverview from '../../Components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';

//inside of the App.js, the shopPage is being nested in a route and it automatically passes the 3 objects (match, location and history) into our component as props
const ShopPage = ({match}) => ( 

        <div className = 'shop-page'>
            <Route  exact path = {`${match.path}`} component = {CollectionsOverview}/>
            <Route path = {`${match.path}/:collectionId`} component = {CollectionPage}></Route>
        </div>
);

export default ShopPage;
//inside div, use string interpolation
//We want the collection to dynamically pluck off the right category from the reducer so that it knows what to display on the category. E.g hats. 
