import React, {useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import './styles/style.css';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

// Components
import Navbar from './components/Navbar';
import Backdrop from "./components/Backdrop";
import SideDrawer from "./components/SideDrawer";
import DeliveryForm from "./screens/DeliveryForm";
function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <BrowserRouter>
    <NavbarInventory/>
    <Router>
      <Navbar click={() => setSideToggle(true)}/>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
      
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/product/:id'  element={<ProductScreen/>} />
          <Route path='/cart'  element={<CartScreen/>} />
          <Route exact path="/delivery" element={<DeliveryForm/>} />
          <Route
            path="/Inventory"
            element={<Home />}
          />
          <Route
            path='/NewProduct'
            element={<NewProduct />}
          />
          <Route
            path='/UpdatePage/:id'
            element={<UpdatePage />}
          />
        </Routes>
      </main>
    </Router>
    </BrowserRouter>
  );
}

export default App;
