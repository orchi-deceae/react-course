import ProductGrid from "./extra/ProductGrid"


export default function Page({ products }){
    return(<>
        <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />
        
        <div className="home-page">
            <div className="products-grid">
                {products.map((product) => {
                    return <ProductGrid
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        rating={product.rating}
                        priceCents={product.priceCents}
                        key={product.id}
                    />
                })}
            </div>
        </div>
    </>)
}