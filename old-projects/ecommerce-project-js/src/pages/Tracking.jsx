import Header from "../components/general/Header";
import Page from "../components/Tracking/Page";
import "../components/Tracking/Page.css"

export default function Tracking({ cart }) {
    return (<>
        <Header cart={cart} />
        <Page />
    </>)
}