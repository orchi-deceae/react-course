import { Routes, Route } from 'react-router';
import { useEffect, useState } from "react"
import axios from 'axios'
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';

function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{
        async function loadProducts(){
            const response = await axios.get("/api/products")
            setProducts(response.data)
        }
        async function loadCart(){
            const response = await axios.get("/api/cart-items?expand=product")
            setCart(response.data)
        }
        loadProducts()
        loadCart()
    }, [])

    return (<>
        <Routes>
            <Route index element={<Home cart={cart} products={products} />} />
            <Route path='/checkout' element={<Checkout cart={cart} />} />
            <Route path='/orders' element={<Orders cart={cart} products={products} />} />
            <Route path='/tracking' element={<Tracking cart={cart} products={products} />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </>)
}

export default App
