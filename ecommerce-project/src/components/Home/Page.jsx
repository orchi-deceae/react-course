import { useEffect, useState } from "react"
import ProductGrid from "./extra/ProductGrid"
import axios from 'axios'


export default function Page(){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function loadProducts(){
            const response = await axios.get("http://localhost:3000/api/products")
            console.log(response.data)
            setProducts(response.data)
        }
        loadProducts()
    }, [])
    return(<>
        <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />
        
        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
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