import Header from "../components/Checkout/Header"
import Page from "../components/Checkout/Page"
import "../components/Checkout/Header.css"
import "../components/Checkout/Page.css"

export default function Checkout({ cart, setCart }) {
    return (<>
        <Header cart={cart} />
        <Page cart={cart} setCart={setCart} />
    </>)
}