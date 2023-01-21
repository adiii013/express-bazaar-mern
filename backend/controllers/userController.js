const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')

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
    }),

    // Logout User

    logoutUser : catchAsyncError(async(req,res,next)=>{
        
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        
        res.status(200).json({
            success:true,
            message:"Logged out"
        })
    }),
    
    // Forgot Password

    forgotPassword: catchAsyncError(async(req,res,next)=>{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return next(new ErrorHandler("User not found",404))
        }
        //Get reset password token
        const resetToken = user.getResetPasswordToken()
        await user.save({validateBeforeSave:false})
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/${resetToken}`
        
        const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then please ignore it`;

        try {
            await sendEmail({
                email:user.email,
                subject: 'Express Bazaar Password Forget',
                message
            })
            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email} succesfully`
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({validateBeforeSave:false})
            return next(new ErrorHandler(error.message,500))
        }
    }),

    // Get user details

    getUserDetails : catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success:true,
            user
        })
    }) ,

    //Update user Profile

    updateUserProfile: catchAsyncError(async(req,res,next)=>{
       const newUserData = {
        name:req.body.name,
        email:req.body.email,
       }

       const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
       })

       res.status(200).json({
        success:true,
        user
       })
    }),

    //Get all user admin

    getAllUser:catchAsyncError(async(req,res,next)=>{
        const users = await User.find();
        res.status(200).json({
            success:true,
            users
        })
    }),

    //Get single user admin

    getSingleUser: catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.params.id);
        console.log("Hello");
        if(!user){
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
        }
        res.status(200).json({
            success:true,
            user,
        })
    })
}

module.exports = userController