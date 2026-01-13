import logo from "../../assets/images/logo-white.png"
import mobileLogo from "../../assets/images/mobile-logo-white.png"
import cartIcon from "../../assets/images/icons/cart-icon.png"
import searchIcon from "../../assets/images/icons/search-icon.png"
import { NavLink, useNavigate } from "react-router"
import { useState } from "react"

export default function Header({ cart }) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    
    function getCartQuantity(sum=0){
        cart.forEach(item => sum += item.quantity);
        return sum;
    }
    return (<>
        <title>Orders</title>

        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo" src={logo} />
                    <img className="mobile-logo" src={mobileLogo} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search"
                    onChange={(ev)=>{setSearch(ev.target.value)}}
                />

                <button className="search-button" onClick={()=>navigate(`/?search=${search}`)}>
                    <img className="search-icon" src={searchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={cartIcon} />
                    <div className="cart-quantity">{getCartQuantity()}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    </>)
}