import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider =(props)=> {

    const url = 'https://food-ordering-app-backend-148t.onrender.com'
    const [token, setToken] = useState('')
    const [cartItem, setCartItem] = useState({})
    const [food_list, setFoodList] = useState([])

    //to add food to cart
    const addToCart = async(itemId) =>{

        if(!cartItem[itemId]){
            setCartItem((prev)=> ({...prev, [itemId]:1}))
        }
        else{
            setCartItem((prev)=> ({...prev, [itemId]:prev[itemId]+1}))
        }
        
        if (token) {
            await axios.post(url + '/api/cart/add', {itemId}, {headers:{token}})
        }
    }

    //to remove food from cart
    const removeFromCart = async(itemId)=>{
        setCartItem((prev)=> ({...prev, [itemId]: prev[itemId]-1}))

        if (token) {
            await axios.post(url + '/api/cart/remove', {itemId}, {headers:{token}})
        }
    }

    //to get cartData from db
    const loadCartData = async(token) =>{
        const response = await axios.post(url + '/api/cart/get', {}, {headers:  {token}})        
        setCartItem(response.data.message)
    }

    const getTotalCartAmount = ()=>{
        let total = 0
        for( const i in cartItem){
            let cartInfo = food_list.find((product)=> product._id === i)
            total = total + cartInfo.price*cartItem[i]
        }
        return total
    }

    const fetchFoodList = async() =>{
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }

    //to setToken again after page refreshes
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            await loadCartData(localStorage.getItem('token'))
        }
        }
        loadData();

    },[])

    const contextValue = {
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        food_list
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
