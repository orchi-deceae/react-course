import CheckoutHeader from "../components/Checkout/CheckoutHeader"
import Main from "../components/Checkout/Main"
import "../styles/pages/checkout/checkout-header.css"
import "../styles/pages/checkout/checkout.css"

export default function Checkout() {
    return (<>
        <CheckoutHeader/>
        <Main/>
    </>)
}