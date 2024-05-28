const mongoose=require('mongoose')
require('dotenv').config();

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
}
connect();

const db=mongoose.connection;

db.on('connected',()=>{
    console.log(`database connected with ${db.host}`);
})

db.on('disconnected',()=>{
    console.log(`database disconnected with ${db.host}`);
})

db.on('error',(err)=>{
    console.log(err);
})

module.exports=db