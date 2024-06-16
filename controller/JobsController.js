const Job=require('./../models/JobModel')
const mongoose=require('mongoose')

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
    try {
        const { status, workType, workLocation, sortBy } = req.query;

        // Conditions for Searching
        const queryObject = {};
        if (status) {
            queryObject.status = status;
        }
        if (workType) {
            queryObject.workType = workType;
        }
        if (workLocation) {
            queryObject.workLocation = workLocation;
        }

        let result = Job.find(queryObject);

        // Sorting
        if (sortBy === "Latest") {
            result = result.sort("-createdAt");
        }else if(sortBy=="Oldest"){
            result=result.sort("createdAt");
        }

        // Pagination
        const page= Number(req.query.page) || 1
        const limit=20;
        const startIndex=(page-1)*limit;
        result=result.skip(startIndex).limit(limit);
        const totalJobs=await Job.countDocuments(queryObject);
        const totalPages=Math.ceil(totalJobs/limit);

        const jobs = await result;
        resp.status(200).json({
            totalJobs: totalJobs,
            totalPage: totalPages,
            jobs
        });
    } catch (err) {
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