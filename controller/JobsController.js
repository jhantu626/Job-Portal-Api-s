const Job=require('./../models/JobModel')

//Create Jobs || POST
const createJob=async(req,resp,next)=>{
    try{
        req.body.createdBy=req.user.id;
        const job=new Job(req.body);
        const savedJob=await job.save();
        resp.status(201)
        .json({
            status: true,
            msg: "Job Created Successfully",
            savedJob
        })
    }catch(err){
        next(err);
    }
}

const getAllJobs=async(req,resp,next)=>{
    try{
        const jobs=await Job.find();
        resp.status(200).json({
            totalJobs: jobs.length,
            jobs
        });
    }catch(err){
        next(err);
    }
}

const getAllJobsById=async(req,resp,next)=>{
    try{
        const jobs=await Job.find({createdBy: req.user.id});
        resp.status(200).
            json({
                totalJobs: jobs.length,
                jobs
            })
    }catch(err){
        next(err);
    }
}

module.exports={createJob,getAllJobsById,getAllJobs}