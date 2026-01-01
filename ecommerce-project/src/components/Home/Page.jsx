import products from "../../backend/products.json"
import ProductGrid from "./extra/ProductGrid"
import axios from 'axios'


export default function Page(){
    async function getProducts(){
        const response = await axios.get("http://localhost:3000/api/products")
        console.log(response.data)
    }
    getProducts()
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