const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is Required'],
    },
    email: {
        type: String,
        required: [true,'Email is Required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password is Required']
    },
    location: {
        type: String,
        default: "India"
    }
})

userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(this.password,salt);
    this.password=hashPass;
})

userSchema.methods.comparePassword=async function(candidatePass){
    try{
        const isMatch=await bcrypt.compare(candidatePass,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User