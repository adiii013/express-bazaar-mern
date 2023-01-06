const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

const userController = {
    registerUser: catchAsyncError(async(req,res,next)=>{
        const {name,email,password} = req.body
        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"fdsfvsf",
                url:"dfvdsvfsf"
            }
        })
        sendToken(user,200,res);
    }),

    // Login user

    loginUser: catchAsyncError(async(req,res,next)=>{
        const {email,password} = req.body;
        // checking if user has given password and email both
        if(!email || !password){
            return next(new ErrorHandler("Please enter email and password",400))
        }
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorHandler("Invalid email or password"))
        }
        const isPasswordMatched = user.comparePassword(password)
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password"))
        }
        sendToken(user,200,res);
    })
}

module.exports = userController