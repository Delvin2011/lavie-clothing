import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; //high order component that lets us modify our component to have access to things related to redux.
import {createStructuredSelector} from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import {selectCartHidden} from '../../redux/cart/cart-selectors';
import {selectCurrentUser} from '../../redux/user/user-selectors';

import './header.scss';

const Header = ({currentUser,hidden}) => ( //destructure the currentUser property
    <div className = 'header'>
        <Link className = 'logo-container' to="/">
            <Logo className = 'logo'/>
        </Link>
        <div className = 'options'>
            <Link className = 'option' to='/shop'>
                SHOP
            </Link>
            <Link className = 'option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? //conditionally render a div if tru (currentUser is an object) and Link if false (currentUser is null)
                <div className = 'option' onClick = {() => auth.signOut()}>SIGN OUT</div> //functional callback that calls auth.signOut (from firebase)
                :
                <Link className = 'option' to = '/signin'>SIGN IN</Link>
            }
            <CartIcon />
            
        </div> 
        {   hidden 
            ? null 
            : <CartDropdown />// if hidden render nothing else render cart.
        } 
        
    </div>
)

//createStructuredSelector - properties that we want point to the correct selector
//will get our state into the subsequent selector: currentUser, hidden
const mapStateToProps = createStructuredSelector({ //state will be the root.reducer
    currentUser : selectCurrentUser,
    hidden: selectCartHidden //to show or hide the cart.
}) //naming mapStateToProps can be anything
export default connect(mapStateToProps)(Header);