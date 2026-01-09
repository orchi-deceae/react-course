import ProductGrid from "./extra/ProductGrid"
import { useEffect, useState } from "react"
import get from "../utils/data"


export default function Page() {
    const [products, setProducts] = useState([])
    useEffect(() => {get("products", setProducts)}, [])

    return (<>
        <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        rating={product.rating}
                        priceCents={product.priceCents}
                    />
                })}
            </div>
        </div>
    </>)
}