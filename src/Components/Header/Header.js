import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import image from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(userContext);
    return (
        <div className="header">
             <img src={image} alt=""/>
             <nav>
                 <Link to="/shop">Shop</Link>
                 <Link to="/review">Review</Link>
                 <Link to="/inventory">Manage Inventory</Link>
                 <Link to="/login"><button onClick={() => setLoggedIn({})}>{loggedIn.email ? 'Sign Out' : 'Sign In'}</button></Link>
                 
             </nav>
        </div>
    );
};

export default Header;