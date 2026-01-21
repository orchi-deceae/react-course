import Header from "../components/general/Header";
import Page from "../components/Orders/Page";
import "../components/Orders/Page.css"

export default function Orders({ cart, loadCart }) {
    return (<>
        <Header cart={cart} />
        <Page loadCart={loadCart} />
    </>)
}