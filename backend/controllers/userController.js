import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//creating token for authenticate user
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Signup user
const signUp = async(req, res)=>{

    const {name, email, password} = req.body
    try {
        //checking for unique user
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success: false, message: 'User Already Exist'})
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Please enter a valid email'})
        }
        if (password.length<8) {
            return res.json({success: false, message: 'Please enter a strong password'})
        }
        
        //hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        

        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:'Error'})
    }
}

//Login user
const logIn = async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email})
    if (!user) {
        return res.json({success:false, message:"User doesn't exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.json({success:false, message:"Enter correct password"})
    }

    const token = createToken(user._id)
    res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:'Error'})
    }

    
}

export {signUp, logIn}