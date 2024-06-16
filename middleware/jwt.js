const jwt=require('jsonwebtoken')
require('dotenv').config();

const jwtMiddleWare=(req,resp,next)=>{
    try{
        if(!req.headers.authorization){
            const error=new Error("Token not found!");
            error.statusCode=401;
            throw error;
        } 
    
        const token=req.headers.authorization.substring(7);
        if(!token){
            const error=new Error("Unautorized user!");
            error.statusCode=401;
            throw error;
        }

        const payload=jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            const error=new Error("Invalid Token!");
            error.statusCode=401;
            throw error;
        }
        req.user=payload;
        console.log(payload);
        next();
    }catch(error){
        next(error);
    }
}

const genToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET);
}

module.exports={jwtMiddleWare,genToken}