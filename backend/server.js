import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import Razorpay from 'razorpay'


//app config
const app = express()
const port = process.env.port || 4000

//creating razorpay instance
export const instance = new Razorpay({
    key_id: process.env.Razorpay_API_KEY,
    key_secret: process.env.Razorpay_API_SECRET,
  });

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB()

//fetching Razorpay API key
app.get('/api/getkey', (req,res)=>{ res.status(200).json({key: process.env.Razorpay_API_KEY})})

//API endpoint
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/images', express.static('uploads'))


app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}` );
})


//mongodb+srv://rahulbhagat:Royalkingrahul7982.@cluster0.3ckfr.mongodb.net/?