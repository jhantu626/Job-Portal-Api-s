const express=require('express')
const router=express.Router();
const {jwtMiddleWare}=require('./../middleware/jwt')
const {createJob,getAllJobs,getAllJobsById}=require('./../controller/JobsController.js')

//Create Jobs
router.post('/create',jwtMiddleWare,createJob)
router.get('/get',jwtMiddleWare,getAllJobs);
router.get('/get-jobs',jwtMiddleWare,getAllJobsById)



module.exports=router;