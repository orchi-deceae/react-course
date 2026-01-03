import Header from "../components/universal/Header";
import Page from "../components/Orders/Page";
import "../components/Orders/Page.css"

export default function Orders({ cart, products }) {
    return (<>
        <Header />
        <Page />
    </>)
}