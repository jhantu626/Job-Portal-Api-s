const User=require('./../models/userModel')
const {body,validationResult}=require('express-validator')

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
        resp.status(201).json({
            success: true,
            msg: "User created successfully!",
            savedUser
        });
    }catch(err){
        next(err);
    }
}

module.exports={registerController}