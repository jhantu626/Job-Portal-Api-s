//Error Middleware || NEXT Function
const errorMiddleWare=(err,req,resp,next)=>{
    console.log(err);
    resp.status(err.statusCode)
    .json({
        success: false,
        msg: err.message
    });
}

module.exports=errorMiddleWare;