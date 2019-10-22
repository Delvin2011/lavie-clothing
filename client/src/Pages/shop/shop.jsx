import React from 'react';
import {Route} from 'react-router-dom'; //putting the collections over-view in a route
import CollectionsOverview from '../../Components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
//inside of the App.js, the shopPage is being nested in a route and it automatically passes the 3 objects (match, location and history) into our component as props
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop-actions';



class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null; //snapshot representation of the collection
    
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

       this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot); //want to store this in shop reducer
            updateCollections(collectionsMap);
        })
    }
    render(){
        const {match} = this.props;
        return( 

            <div className = 'shop-page'>
                <Route  exact path = {`${match.path}`} component = {CollectionsOverview}/>
                <Route path = {`${match.path}/:collectionId`} component = {CollectionPage}></Route>
            </div>
    );
    }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
//inside div, use string interpolation
//We want the collection to dynamically pluck off the right category from the reducer so that it knows what to display on the category. E.g hats. 
