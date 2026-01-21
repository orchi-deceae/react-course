import Header from "../components/general/Header";
import Page from "../components/Home/Page";
import "../components/Home/Page.css"

export default function Home({ cart, loadCart }) {
    return (<>
        <Header cart={cart} />
        <Page loadCart={loadCart} />
    </>)
}