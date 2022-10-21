import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/home-page/HomePage";

function App() {
    return (
        <Router>
            <Header/>
            <Navbar/>

            <Routes>
                <Route path="/" element={<><HomePage/></>}/>
            </Routes>
        </Router>
    );
}

export default App;
