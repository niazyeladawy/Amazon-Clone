import React from 'react';
import './Header.css';
import logo from '../../assets/nav-sprite-global-1x-hm-dsk-reorg._CB405931292_.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase';

function Header() {
    const [{ basket, user }] = useStateValue();


    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/" className="header__anchor" style={{ 
      backgroundImage: `url(${logo})` 
    }}></Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"}>
                    <div className="header__option text-decoration-none" onClick={handleAuthentication}>
                        <span className="header_optionLineOne">Hello {!user ? "Guest" : user.email}</span>
                        <span className="header_optionLineTwo">{user ? "Logout" : "LogIn"}</span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to='./checkout' className="shopping__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />

                        <span className="header_optionLineTwo header__basketCount">{basket?.length}</span>


                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
