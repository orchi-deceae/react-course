import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Checkout from './pages/Checkout';
import "./styles/pages/tracking.css"
import "./styles/pages/orders.css"

function App() {

    return (<>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='checkout' element={<Checkout />} />
        </Routes>
    </>)
}

export default App
