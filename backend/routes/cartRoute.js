import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

//route for addToCart
cartRouter.post('/add', authMiddleware, addToCart)

//route for removeFromCart
cartRouter.post('/remove', authMiddleware,  removeFromCart)

//route for getCart
cartRouter.post('/get', authMiddleware,  getCart)

export default cartRouter;

