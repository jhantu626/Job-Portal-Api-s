//Error Middleware || NEXT Function
const errorMiddleWare=(err,req,resp,next)=>{
    console.log(err);
    resp.status(500)
    .json({
        success: false,
        msg: "Something went wrong",
        err
    });
}

module.exports=errorMiddleWare;