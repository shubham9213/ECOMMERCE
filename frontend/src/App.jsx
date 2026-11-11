import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/about.jsx'
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import PrivacyPolicy from "./pages/privacy.jsx"
import Disclaimer from './pages/disclaimer.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Product from "./pages/productid.jsx"
import Shop from './pages/shop.jsx';
import Cart from './pages/cart.jsx';
import Admin from './admin/admindashboard.jsx';
import Alluser from './admin/alluser.jsx';
import Allproduct from './admin/Allproduct.jsx';
import Addproduct from './admin/Addproduct.jsx';
import Editproduct from './admin/editproduct.jsx';
import Order from './admin/order.jsx';
import Myprofile from './pages/Myprofile.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
      <Route path="/disclaimer" element={<Disclaimer/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/product/:id' element={<Product/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>

      <Route path='/cart' element={<Cart/>}></Route>

      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/admin/users' element={<Alluser/>}></Route>
      <Route path='/admin/products' element={<Allproduct/>}></Route>
      <Route path='/admin/add-product' element={<Addproduct/>}></Route>
      <Route path="/edit-product/:id" element={<Editproduct/>}></Route>
      <Route path='/admin/orders' element={<Order/>}></Route>
      <Route path='/myprofile' element={<Myprofile/>}></Route>
      <Route path='/checkout'element={<Checkout/>}></Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
