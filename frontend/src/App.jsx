import React, { useRef, useState } from 'react'
import './app.css'
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
import {motion} from 'framer-motion'

const App = () => {

  const view = {
    initial: {
      opacity: 1,
      y:0,
    },
    animate: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 2,
        delay: 5
      }
    }
  }

  const [showLogin, setShowLogin] = useState(false)
  const videoRef = useRef(null)

  const handleMute = () =>{
    if (videoRef.current) {
      videoRef.current.muted = false
    }
  }
  return (
    <>
    <motion.div className="intro" variants={view} initial='initial' animate='animate'>
      <video ref={videoRef} autoPlay muted playsInline src="intro.mp4"></video>
      <button onClick={handleMute}>Mute</button>
    </motion.div>
    <motion.div className="" initial={{opacity:0}} animate={{opacity:1, transition:{duration:3, delay:5}}}>
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
    </motion.div>
    
    </>
    
  )
}

export default App
