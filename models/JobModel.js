const mongoose=require('mongoose')


const jobSchema=new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending','Reject','Interview'],
        default: 'Pending'
    },
    workType: {
        type: String,
        enum: ['Full-Time','Part-Time','Internship','Contract'],
        default: 'Full-Time'
    },
    workLocation: {
        type: String,
        default: 'India'
    },
    jobDescription:{
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true})

const Job=mongoose.model('Jobs',jobSchema);
module.exports=Job;