import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/home-page/HomePage";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";
import ClientRoutes from "./auth/ClientRoutes";
import EmployeeRoutes from "./auth/EmployeeRoutes";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Settings from "./components/profile/settings/Settings";
import ListOfProducts from "./components/profile/list-of-products/ListOfProducts";
import ChooseOption from "./components/choose-option/ChooseOption";
import ShopForm from "./components/shop-form/ShopForm";
import ProductsList from "./components/products-list/ProductsList";
import Product from "./components/product/Product";
import AddingProduct from "./components/profile/adding-product/AddingProduct";
import ListOfUsers from "./components/profile/list-of-users/ListOfUsers";
import ListOfAnimal from "./components/profile/list-of-animals/ListOfAnimal";
import AddingAnimal from "./components/profile/adding-animal/AddingAnimal";
import ListOfProductsSets from "./components/profile/list-of-products-sets/ListOfProductsSets";
import AddingProductsSets from "./components/profile/adding-products-set/AddingProductsSets";
import OrderDetails from "./components/profile/order-details/OrderDetails";
import Cart from "./components/cart/Cart";
import OrderSummary from "./components/order-summary/OrderSummary";
import Sales from "./components/sales/Sales";
import AnimalsList from "./components/animals-list/AnimalsList";
import Animal from "./components/animal/Animal";
import ProductsSet from "./components/products-set/ProductsSet";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Navbar/>

            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/zarejestruj-sie" component={Register}/>
                <Route path="/zaloguj-sie" component={Login}/>
                <Route path="/promocje"><Sales/></Route>
                <Route path="/koszyk"><Cart/></Route>
                <Route path="/zamowienie"><OrderSummary/></Route>

                <Route path="/choose-option/koty"><ChooseOption choose={'koty'}/></Route>
                <Route path="/choose-option/psy"><ChooseOption choose={'psy'}/></Route>
                <Route path="/choose-option/male-zwierzatka"><ChooseOption choose={'male-zwierzatka'}/></Route>

                <Route path="/adopcja/:animalType" exact><AnimalsList/></Route>
                <Route path="/adopcja/:animalType/:animalId" exact><Animal/></Route>

                <Route path="/shop-form/koty"><ShopForm/></Route>

                <Route path="/shop/:animalType/products/:productCategory" exact>
                    <ProductsList animalType="koty" productCategory="sucha-karma"/>
                </Route>

                <Route path="/shop/:animalType/products/:productCategory/:productName" exact>
                    <Product animalType="koty" productCategory="sucha-karma"
                             productName="whiskas-sterile-14-kg-z-kurczakiem"/>
                </Route>

                <Route path="/shop/:animalType/productsset/zestawy/:productName" exact>
                    <ProductsSet />
                </Route>

                {/*Links only for client*/}
                <ClientRoutes path="/profil/zamowienia" exact><Profile choose={'his_orders'}/></ClientRoutes>
                <ClientRoutes path="/profil/ustawienia" exact><Settings choose={'settings'}/></ClientRoutes>
                <ClientRoutes path="/profil/zamowienie/id" exact><OrderDetails choose={'his_orders'}/></ClientRoutes>

                {/*Links only for employee*/}
                <EmployeeRoutes path="/profil/pracownik/zamowienia" exact><Profile choose={'orders'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/zamowienie/id" exact><OrderDetails
                    choose={'orders'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/ustawienia" exact><Settings choose={'settings'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/uzytkownicy" exact><ListOfUsers
                    choose={'users'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/produkty" exact><ListOfProducts
                    choose={'products'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/produkty/dodanie-nowego-produktu" exact><AddingProduct
                    choose={'products'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/zwierzeta" exact><ListOfAnimal
                    choose={'animals'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/produkty/dodanie-pupila-do-adopcji" exact><AddingAnimal
                    choose={'animals'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/zestawy-produktow" exact><ListOfProductsSets
                    choose={'products-sets'}/></EmployeeRoutes>
                <EmployeeRoutes path="/profil/pracownik/produkty/dodanie-nowego-zestawu" exact><AddingProductsSets
                    choose={'products-sets'}/></EmployeeRoutes>

            </Switch>

            <Footer/>
        </BrowserRouter>
    );
}

export default App;
