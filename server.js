const express=require('express')
const app=express();
require('dotenv').config();


app.get('/welcome',(req,resp)=>{
    resp.send('welcome to our Job Portal!');
})

const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})