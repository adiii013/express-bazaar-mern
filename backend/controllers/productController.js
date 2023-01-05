const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')


const productController = {

    
    getAllProducts :catchAsyncError(async (req,res)=>{
        const products = await Product.find();
        res.status(200).json({
            success:true,
            products
        }) 
    }),


    createProduct:catchAsyncError(async (req,res,next)=>{
        const product = await Product.create(req.body)
        res.status(201).json({
            success:true,
            product
        })
    }),


    updateProduct:catchAsyncError(async(req,res,next)=>{
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            success:true,
            product
        })
    }),



    deleteProduct:catchAsyncError(async(req,res,next)=>{
        const product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        await product.deleteOne()
        res.status(200).json({
            success:true,
            message:"Product removed succesfully"
        })
    }),



    getProductDetails:catchAsyncError(async(req,res,next)=>{
        const product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        res.status(200).json({success:true,product})
    })
}

module.exports = productController