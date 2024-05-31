const testPostController=(req,resp)=>{
    const {name}=req.body;
    console.log(req.user.id);
    resp.status(200).send(`Your Name is ${name}`);
}

module.exports={testPostController}