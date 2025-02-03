import React, { useContext, useState } from 'react'
import './loginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState('Sign up')
    const [credentials, setCredentials] = useState({
      name: '',
      email: '',
      password: ''
    })

    const handleChange = (e)=> {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    const OnLogin = async(e) =>{
      e.preventDefault();
      let newUrl = url
      if (currState==='Login') {
        newUrl += '/api/user/login'
      }
      else{
        newUrl += '/api/user/signup'
      }

      const response = await axios.post(`${newUrl}`, credentials)

      if (response.data.success) {
        setToken(response.data.token)
        
        localStorage.setItem('token', response.data.token)

        //putting false to it gets hidden
        setShowLogin(false)
      }

      else{
        alert(response.data.message)
      }
    }
  return (
    <div className='login-popup'>
      <form onSubmit={OnLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==='Sign up' && <input type="text" name='name' placeholder='Your name' required onChange={handleChange} value={credentials.name}/>}
            <input type="email" name="email" id="email" placeholder='Your email' required onChange={handleChange} value={credentials.email}/>
            <input type="password" name="password" id="password" placeholder='Password' required onChange={handleChange} value={credentials.password}/>
        </div>
        <button type='submit'>{currState==='Sign up'?'Create account':'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==='Login'?<p>Create a new account? <span onClick={()=> setCurrState('Sign up')}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=> setCurrState('Login')}>Login here</span></p>}
        
      </form>
    </div>  
  )
}

export default LoginPopup
