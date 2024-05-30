const testPostController=(req,resp)=>{
    const {name}=req.body;
    resp.status(200).send(`Your Name is ${name}`);
}

module.exports={testPostController}