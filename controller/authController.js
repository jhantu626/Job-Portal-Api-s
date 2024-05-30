const User=require('./../models/userModel')

const registerController=async(req,resp)=>{
    try{
        const {name,email,password}=req.body;
        if(!name){
            return resp.json("Name is Required!");
        }
        if(!email){
            return resp.json("Email is Required!");
        }
        if(!password){
            return resp.json("password is Required!");
        }

        const existingUser=await User.findOne({email: email});
        if(existingUser){
            return resp.json("User already is registerd!");
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
        console.log(err);
        resp.status(500).json({
            msg: "Error in registerController",
            success: false,
            err
        });
    }
}

module.exports={registerController}