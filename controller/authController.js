const User=require('./../models/userModel')
const {body,validationResult}=require('express-validator')

const registerController=async(req,resp,next)=>{
    try{
        //If there are any errors occur for validations
        const err=validationResult(req);
        if(!err.isEmpty()){
            resp.json(err).status(400);
        } 
        
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email: email});
        if(existingUser){
            return resp.status(401).json("User already is registerd!");
        }

        const user=new User({name,email,password});
        const savedUser=await user.save();
        console.log(savedUser);
        resp.status(201).json({
            success: true,
            msg: "User Created Successfully!",
            savedUser
        });
    }catch(err){
        next(err);
    }
}

module.exports={registerController}