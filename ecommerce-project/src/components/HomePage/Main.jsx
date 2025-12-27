import products from "../../backend/products.json"
import ProductGrid from "./extra/ProductGrid"

export default function Main(){
    console.log(products)
    return(<>
        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
                        id={product.id}
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