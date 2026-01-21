import ProductGrid from "./extra/ProductGrid"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router"


export default function Page({ loadCart }) {
    const [products, setProducts] = useState([])

    const [searchParms] = useSearchParams();
    const search = searchParms.get("search") || ""
    
    async function loadProducts(){
        const response = await axios.get(`/api/products${search && `?search=${search}`}`)
        setProducts(response.data)
    }
    useEffect(() => {loadProducts()}, [search])

    if (!products) return null


    return (<>
        <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
                        product={product}
                        loadCart={loadCart}
                        key={product.id}
                    />
                })}
            </div>
        </div>
    </>)
}