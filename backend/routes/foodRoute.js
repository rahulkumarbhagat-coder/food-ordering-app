import express from 'express'
import multer from 'multer'
import { addFood, deleteFood, listFood } from '../controllers/foodController.js'

const foodRouter = express.Router()

//image storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

//add food route
foodRouter.post('/add', upload.single('image'), addFood)

//list food route
foodRouter.get('/list', listFood)

//delete food item
foodRouter.post('/delete', deleteFood)


export default foodRouter;