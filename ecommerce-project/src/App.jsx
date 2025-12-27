import { Routes, Route } from 'react-router';
import HomePage from './components/HomePage';
import "./styles/shared/general.css"
import "./styles/shared/header.css"
import "./styles/pages/index.css"

function App() {

    return (<>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='checkout' element={<div>hi</div>} />
        </Routes>
    </>)
}

export default App
