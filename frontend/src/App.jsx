import React, { useRef, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import AppDownload from './components/appDownload/AppDownload'
import LoginPopup from './components/loginPopUp/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  
  return (
    <>
    <div>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>: <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <AppDownload/>
    <Footer/>
    </div>
    
    </>
    
  )
}

export default App
