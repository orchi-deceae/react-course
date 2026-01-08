import { Routes, Route } from 'react-router';
import { useEffect, useState } from "react"
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import api from './components/utils/data';

function App() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        api(setCart, "cart-items")
    }, [])

    return (<>
        <Routes>
            <Route index element={<Home cart={cart} setCart={setCart} />} />
            <Route path='/checkout' element={<Checkout cart={cart} />} />
            <Route path='/orders' element={<Orders cart={cart} />} />
            <Route path='/tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
            <Route path='*' element={<NotFound cart={cart} />} />
        </Routes>
    </>)
}

export default App
