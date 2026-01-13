import { Routes, Route } from 'react-router';
import { useEffect, useState } from "react"
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import axios from 'axios';

function App() {
    const [cart, setCart] = useState([])
    async function loadCart(){
        const response = await axios.get("/api/cart-items?expand=product")
        setCart(response.data)
    }
    useEffect(() => {loadCart()}, [])

    return (<>
        <Routes>
            <Route index element={<Home cart={cart} loadCart={loadCart} />} />
            <Route path='/checkout' element={<Checkout cart={cart} loadCart={loadCart} />} />
            <Route path='/orders' element={<Orders cart={cart} loadCart={loadCart} />} />
            <Route path='/tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
            <Route path='*' element={<NotFound cart={cart} />} />
        </Routes>
    </>)
}

export default App
