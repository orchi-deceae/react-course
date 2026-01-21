import Header from "../components/general/Header";
import "../components/Home/Page"

export default function NotFound({ cart }) {
    return (<>
        <Header cart={cart} />
        <p style={{ paddingTop: "80px" }}>Page not found</p>
    </>)
}