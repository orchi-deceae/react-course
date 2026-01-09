import ProductGrid from "./extra/ProductGrid"
import { useEffect, useState } from "react"
import get from "../utils/data"


export default function Page({ setCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {get("products", setProducts)}, [])

    return (<>
        <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
                        product={product}
                        setCart={setCart}
                        key={product.id}
                    />
                })}
            </div>
        </div>
    </>)
}