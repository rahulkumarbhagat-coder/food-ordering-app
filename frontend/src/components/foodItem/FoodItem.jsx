import React, { useContext, useState } from 'react'
import './foodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,image,price,description}) => {

  const {cartItem, addToCart, removeFromCart, url } = useContext(StoreContext)

  // const [itemCount, setItemCount] = useState(0)
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url + '/images/' + image} alt="food-image" />
        {!cartItem[id]? <img className='add' onClick={()=>{addToCart(id)}} src={assets.add_icon_white}/>
        : <div className='food-item-counter' >
            <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red}/>
            <p>{cartItem[id]}</p>
            <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green}/>
          </div>}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price}Rs</p>
      </div>
    </div>
  )
}

export default FoodItem
