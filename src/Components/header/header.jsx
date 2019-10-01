import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; //high order component that lets us modify our component to have access to things related to redux.
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';


import './header.scss';

const Header = ({currentUser}) => ( //destructure the currentUser property
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
    </div>
)

const mapStateToProps = state => ({ //state will be the root.reducer
    currentUser: state.user.currentUser
}) //naming mapStateToProps can be anything
export default connect(mapStateToProps)(Header);