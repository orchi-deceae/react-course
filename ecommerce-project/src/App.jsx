import { Routes, Route } from 'react-router';
import { useEffect, useState } from "react"
import axios from 'axios'
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import { api } from './components/utils/data';

function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{
        api(setProducts, "products")
        api(setCart, "cart-items")
        // axios.get("/api/products").then((response)=>{setProducts(response.data)})
        // axios.get("/api/cart-items?expand=product").then((response)=>{setCart(response.data)})
    }, [])
    // console.log(products)
    return (<>
        <Routes>
            <Route index element={<Home cart={cart} products={products} />} />
            <Route path='/checkout' element={<Checkout cart={cart} />} />
            <Route path='/orders' element={<Orders cart={cart} products={products} />} />
            <Route path='/tracking' element={<Tracking cart={cart} />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </>)
}

export default App
