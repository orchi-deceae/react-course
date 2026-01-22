import mobileLogo from "../../assets/images/mobile-logo-white.png"
import searchIcon from "../../assets/images/icons/search-icon.png"
import cartIcon from "../../assets/images/icons/cart-icon.png"
import logo from "../../assets/images/logo-white.png"
import { NavLink, useNavigate } from "react-router"
import { useState, type KeyboardEvent } from "react"
import "./Header.css"

type props = {
    cart: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
}

export default function Header({ cart }: props) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    function getCartQuantity() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    function specialEvents(ev: KeyboardEvent<HTMLInputElement>) {
        if (ev.key === "Enter") navigate(`/?search=${search}`)
        if (ev.key === "Escape") {
            console.log([ev.target]);
            (ev.target as HTMLInputElement).value = ""
            setSearch("")
        }
    }

    return (<>
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
                    onKeyDown={specialEvents}
                    onChange={(ev) => { setSearch(ev.target.value) }}
                />

                <button className="search-button" onClick={() => navigate(`/?search=${search}`)}>
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