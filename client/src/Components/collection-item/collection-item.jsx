import React from 'react';
//import all of the redux bindings that gives us access the same way we did with toggle button
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button';
import { addItem } from '../../redux/cart/cart-actions';

import './collection-item.scss';

const CollectionItem = ({item, addItem}) => {
const {name, price, imageUrl} = item; //destructure off item.
return(
<div className = 'collection-item'>
    <div
        className = 'image'
        style = {{
            backgroundImage: `url(${imageUrl})`
        }}
        />
    <div className = 'collection-footer'>
        <span className = 'name'>{name}</span>
        <span className = 'price'>{price}</span>

    </div>
    <CustomButton onClick = {() => addItem(item)} inverted> Add to cart </CustomButton>
</div>

)};
/*-function will receive the item object
  -pass it into the action item creator (addItem)
  -which gives us the back the object with type =ADD_ITEM and the payload = item that got passed
  -And then dispatch the item object into our store and it will go theough the redux flow*/
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect (null,mapDispatchToProps)(CollectionItem);
//string interpolation value of. ``