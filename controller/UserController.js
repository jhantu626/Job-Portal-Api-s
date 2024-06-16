const User=require('./../models/userModel')


const profileController=async(req,resp,next)=>{
    try{
        const userId=req.user.id;
        console.log(userId)
        const user=await User.findById(userId).select('-password');
        resp.status(200).json(user);
    }catch(err){
        next(err);
    }
}
const updateController=async(req,resp,next)=>{
    try{
        const userId=req.user.id;
        const {name,location}=req.body;
        const user=await User.findById(userId);
        user.name=name;
        user.location=location;
        const updatedUser=await user.save();
        resp.status(200)
            .json({
                status: true,
                msg: "Successfully updated!",
                updatedUser
            });
    }catch(err){
        next(err);
    }
}

const updatePassword=async(req,resp,next)=>{
    try{
        const userId=req.user.id;
        const {currentPassword,newPassword}=req.body;
        const user=await User.findById(userId);
        const isMatch=await user.comparePassword(currentPassword);
        if(!isMatch){
            const error=new Error("Password is not Matching!");
            error.statusCode=403;
            throw error;
        }

        user.password=newPassword;
        await user.save();
        resp.status(200).json({
            status: true,
            msg: "Password updated successfully!"
        });
    }catch(err){
        next(err);
    }
}

const deleteProfile=async(req,resp,next)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
            const error=new Error("User does not exist!");
            error.statusCode=404;
            throw error;
        }
        await User.deleteOne({email: user.email});
        resp.status(200)
        .json({
            status: true,
            msg: "User Deleted Successfully!"
        });
    }catch(err){
        next(err);
    }
}


module.exports={profileController,updateController,
    updatePassword,deleteProfile}