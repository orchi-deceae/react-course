import Header from "../components/universal/Header";
import Page from "../components/Orders/Page";
import "../components/Orders/Page.css"

export default function Orders({ cart }) {
    return (<>
        <Header cart={cart} />
        <Page />
    </>)
}