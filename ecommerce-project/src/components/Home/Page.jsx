// import products from "../../backend/products.json"
import ProductGrid from "./extra/ProductGrid"

export default function Page(){
    async function getProducts(){
        const response = await fetch("http://localhost:3000/api/products")
        const products = await response.json()
        console.log(products)
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