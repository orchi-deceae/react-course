import Header from "../components/universal/Header";
import Page from "../components/Home/Page";
import "../components/universal/general.css"
import "../components/universal/Header.css"
import "../components/Home/Page.css"

export default function Home({ cart }) {
    return (<>
        <Header cart={cart}/>
        <Page />
    </>)
}