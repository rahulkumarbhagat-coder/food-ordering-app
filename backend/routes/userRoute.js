import express from 'express'
import { signUp, logIn } from '../controllers/userController.js'

const userRouter = express.Router();

//signup route
userRouter.post('/signup', signUp)

//login route
userRouter.post('/login', logIn)

export default userRouter;