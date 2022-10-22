import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/home-page/HomePage";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <Router>
            <Header/>
            <Navbar/>

            <Routes>
                <Route path="/" element={<><HomePage/></>}/>
            </Routes>

            <Footer/>
        </Router>
    );
}

export default App;
