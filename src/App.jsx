import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  const [cart,setCart]=useState(0);
  function cartfun(){
    setCart(cart+1)
  }

  return (
    <>
    <Navbar cartValue={cart}/>
    <ProductList cartCounter={cartfun}/>
    <Footer/>
    </>
  )
}

export default App
