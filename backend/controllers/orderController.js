import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { instance } from "../server.js";
import crypto from 'crypto'
import { data } from "react-router-dom";
//placing user's order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const totalAmount =
      req.body.items.reduce((sum, item) => {
        return sum + item.price * item.quantity * 100;
      }, 0) +
      20 * 100;
    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: req.body.userId,
      notes: {
        description: "Order for multiple items including shipping",
      },
    };

    const order = await instance.orders.create(options);
    
    //create payment method
    // const session = await stripe.checkout.session.create({
    //   line_items: line_items,
    //   mode: "payment",
    //   success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //   cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    // });

    res.json({ success: true, order, mongoOrderId: newOrder._id});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//verifying order
const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body.paymentData
  const {orderId} = req.body;

  const hmac = crypto.createHmac('sha256', process.env.Razorpay_API_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

  try {
    if (generated_signature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
 };

//getting user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//list orders for admin panel
const listOrders = async (req, res) =>{
  try {
    const orders = await orderModel.find({})
    res.json({success: true, data: orders})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
  }
}

//updating order status
const orderStatus = async(req, res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
    res.json({success:true, message: "Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: "Error"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, orderStatus};
