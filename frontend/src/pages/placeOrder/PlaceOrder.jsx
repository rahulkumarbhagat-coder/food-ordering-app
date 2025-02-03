import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url} =
    useContext(StoreContext);

  const navigate = useNavigate()

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItem = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItem.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItem,
      amount: getTotalCartAmount() + 20,
    };

    //placing the order
    const orderResponse = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    
    
    //fetching API key for frontend
    const {
      data: { key },
    } = await axios.get(url + "/api/getkey");

    const options = {
      key,
      amount: orderResponse.data.order.amount,
      currency: "INR",
      name: "Tomato",
      description: "Transaction",
      image: assets.logo,
      order_id: orderResponse.data.order.id,
      handler: async function (response) {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        
        if (paymentData) {
          navigate('/verify')
          const verifyResponse = await axios.post(url + "/api/order/verify", {paymentData, orderId:orderResponse.data.mongoOrderId});
          console.log(verifyResponse);
          
          if (verifyResponse.data.success) {
                navigate("/myorders");
              } else {
                alert("Payment Failed");
                navigate("/");
              }
        } else {
          alert("Error");
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    e.preventDefault();
  };

  useEffect(()=>{
    if (!token || getTotalCartAmount()===0) {
      navigate('/cart')
    }
  })

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="fname"
            value={data.fname}
            onChange={onChange}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lname"
            value={data.lname}
            onChange={onChange}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          value={data.email}
          onChange={onChange}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          value={data.street}
          onChange={onChange}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            value={data.city}
            onChange={onChange}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            value={data.state}
            onChange={onChange}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChange}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            value={data.country}
            onChange={onChange}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={onChange}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} Rs</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount()?'20 Rs':'0 Rs'}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount()?getTotalCartAmount()+20 :0} Rs</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
