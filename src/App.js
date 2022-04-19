import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Done from './components/Done/Done';

import './App.css';

function App() {
    return (

        <div className="main-container">

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/done" element={<Done />} />

            </Routes>


        </div>

    );
}

export default App;
