import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/home-page/HomePage";
import Footer from "./components/footer/Footer";
import ChooseOption from "./components/choose-option/ChooseOption";
import ShopForm from "./components/shop-form/ShopForm";

function App() {
    return (
        <Router>
            <Header/>
            <Navbar/>

            <Routes>
                <Route path="/" element={<><HomePage/></>}/>
                <Route path="/choose-option/koty" element={<><ChooseOption/></>}/>
                <Route path="/shop-form/koty" element={<><ShopForm/></>}/>
            </Routes>

            <Footer/>
        </Router>
    );
}

export default App;
