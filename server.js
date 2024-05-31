const express=require('express')
const app=express();
const db=require('./db')
require('dotenv').config();
const cors=require('cors');
const testRoutes=require('./routes/testRoutes')
const authRoutes=require('./routes/authRoutes')
const errorMiddleWare=require('./middleware/errorMiddleware')
require('express-async-errors')

const log=(req,resp,next)=>{
    const date=new Date().toLocaleString();
    console.log(`[${date}] {${req.method}} (${req.url})`);
    next();
}
app.use(log);
app.use(cors());
//To communicate with json Data we are using jsonParser
app.use(express.json());

app.get('/welcome',(req,resp)=>{
    resp.send('welcome to our Job Portal!');
})

app.use('/api/v1/test',testRoutes);
//Auth Routes
app.use('/api/v1/auth',authRoutes);

//Adding MiddleWare
app.use(errorMiddleWare);

const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})