import { Routes, Route } from 'react-router';
import { useEffect, useState } from "react"
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import get from './components/utils/data';

function App() {
    const [cart, setCart] = useState([])
    useEffect(() => { get("cart", setCart) }, [])

    return (<>
        <Routes>
            <Route index element={<Home cart={cart} setCart={setCart} />} />
            <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart} />} />
            <Route path='/orders' element={<Orders cart={cart} />} />
            <Route path='/tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
            <Route path='*' element={<NotFound cart={cart} />} />
        </Routes>
    </>)
}

export default App
