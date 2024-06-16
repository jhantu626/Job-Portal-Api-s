const User=require('./../models/userModel')
const {body,validationResult}=require('express-validator')
const {genToken}=require('./../middleware/jwt')

const registerController=async(req,resp,next)=>{
    try{
        //If there are any errors occur for validations
        const err=validationResult(req);
        if(!err.isEmpty()){
            const errorMessage = err.array()[0].msg; // Get the first error message
            const error=new Error(`${errorMessage}`);
            error.statusCode=400;
            throw error; 
        } 
        
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email: email});
        if(existingUser){
            const error=new Error("User already exists!");
            error.statusCode=400;
            throw error;
        }

        const user=new User({name,email,password});
        const savedUser=await user.save();
        savedUser.password=undefined
        console.log(savedUser);
        const payload={
            id: savedUser.id
        }
        const token=genToken(payload);
        resp.status(201).json({
            success: true,
            token: token
        });
    }catch(err){
        next(err);
    }
}


const loginController=async(req,resp,next)=>{
    try{
        const err=validationResult(req);
        if(!err.isEmpty()){
            const errorMessage = err.array()[0].msg; // Get the first error message
            const error=new Error(errorMessage);
            error.statusCode=400;
            throw error; 
        }
        
        const {email,password}=req.body;
        const user=await User.findOne({email: email});
        if(!user){
            const error=new Error("User does not exist!");
            error.statusCode=404;
            throw error;
        }
        const isPasswordMatch=await user.comparePassword(password);
        if(!isPasswordMatch){
            const error=new Error("Unauthorized user!");
            error.statusCode=401;
            throw error;
        }

        const payload={
            id: user.id
        }
        const token=genToken(payload);
        resp.status(200).json(token);
    }catch(error){
        next(error)
    }
}
module.exports={registerController,loginController}