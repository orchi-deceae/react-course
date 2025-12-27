import { Routes, Route } from 'react-router';
import HomePage from './components/HomePage';
import Checkout from './components/checkout';
import "./styles/shared/general.css"
import "./styles/shared/header.css"
import "./styles/pages/index.css"

function App() {

    return (<>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='checkout' element={<Checkout />} />
        </Routes>
    </>)
}

export default App
